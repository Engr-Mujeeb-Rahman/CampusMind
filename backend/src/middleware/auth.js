const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Missing or invalid authorization header'));
  }

  const token = authHeader.split(' ')[1];

  if (!supabase.isConfigured()) {
    req.user = { id: token, email: null, isAnonymous: true };
    return next();
  }

  try {
    const client = supabase.getServiceClient();
    const { data, error } = await client.auth.getUser(token);

    if (error || !data.user) {
      return next(ApiError.unauthorized('Invalid or expired session token.'));
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
      isAnonymous: false,
    };

    next();
  } catch (err) {
    return next(ApiError.unauthorized('Authentication failed.'));
  }
}

module.exports = auth;
