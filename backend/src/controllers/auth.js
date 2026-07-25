const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');

async function signup(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest('Email and password are required.');
  }

  if (password.length < 6) {
    throw ApiError.badRequest('Password must be at least 6 characters.');
  }

  const client = supabase.getClient();
  if (!client) {
    throw ApiError.internal('Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env.');
  }

  const { data, error } = await client.auth.signUp({ email, password });

  if (error) {
    if (error.message.includes('already registered')) {
      throw ApiError.conflict('An account with this email already exists.');
    }
    throw ApiError.badRequest(error.message);
  }

  res.status(201).json({
    success: true,
    data: {
      user: { id: data.user.id, email: data.user.email },
      session: data.session
        ? { access_token: data.session.access_token, refresh_token: data.session.refresh_token }
        : null,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest('Email and password are required.');
  }

  const client = supabase.getClient();
  if (!client) {
    throw ApiError.internal('Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env.');
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw ApiError.unauthorized('Invalid email or password.');
    }
    throw ApiError.badRequest(error.message);
  }

  res.json({
    success: true,
    data: {
      user: { id: data.user.id, email: data.user.email },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
    },
  });
}

async function logout(req, res) {
  const client = supabase.getClient();
  if (client) {
    await client.auth.signOut();
  }

  res.json({ success: true, data: { message: 'Logged out successfully.' } });
}

async function me(req, res) {
  if (!supabase.isConfigured()) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    res.json({
      success: true,
      data: {
        user: { id: token || 'anonymous', email: 'dev@campusmind.local' },
        devMode: true,
      },
    });
    return;
  }

  const client = supabase.getServiceClient();
  if (!client) {
    throw ApiError.internal('Supabase not configured properly.');
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    throw ApiError.unauthorized('No session token provided.');
  }

  const { data, error } = await client.auth.getUser(token);

  if (error || !data.user) {
    throw ApiError.unauthorized('Invalid or expired session.');
  }

  res.json({
    success: true,
    data: {
      user: { id: data.user.id, email: data.user.email },
    },
  });
}

module.exports = { signup, login, logout, me };
