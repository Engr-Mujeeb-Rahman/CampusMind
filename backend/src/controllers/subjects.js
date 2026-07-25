const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');

async function list(req, res) {
  if (!supabase.isConfigured()) {
    return res.json({ success: true, data: [] });
  }

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('subjects')
    .select('id, name, created_at')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) throw ApiError.internal('Failed to fetch subjects.');

  res.json({ success: true, data });
}

async function create(req, res) {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw ApiError.badRequest('Subject name is required.');
  }

  if (!supabase.isConfigured()) {
    return res.json({
      success: true,
      data: { id: 'dev-' + Date.now(), name: name.trim() },
    });
  }

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('subjects')
    .insert({ user_id: req.user.id, name: name.trim() })
    .select()
    .single();

  if (error) {
    if (error.message.includes('unique')) {
      throw ApiError.conflict('A subject with this name already exists.');
    }
    throw ApiError.internal('Failed to create subject.');
  }

  res.status(201).json({ success: true, data });
}

async function remove(req, res) {
  if (!supabase.isConfigured()) {
    return res.json({ success: true, data: { deleted: true } });
  }

  const client = supabase.getServiceClient();
  const { error } = await client
    .from('subjects')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id);

  if (error) throw ApiError.internal('Failed to delete subject.');

  res.json({ success: true, data: { id: req.params.id, deleted: true } });
}

module.exports = { list, create, remove };
