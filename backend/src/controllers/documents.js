const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');

async function list(req, res) {
  if (!supabase.isConfigured()) {
    return res.json({ success: true, data: [] });
  }

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('documents')
    .select('id, title, status, subject_id, created_at, error_message')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) throw ApiError.internal('Failed to fetch documents: ' + error.message);

  res.json({ success: true, data });
}

async function getById(req, res) {
  if (!supabase.isConfigured()) {
    return res.json({ success: true, data: null });
  }

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('documents')
    .select('*')
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .single();

  if (error) throw ApiError.notFound('Document not found.');

  res.json({ success: true, data });
}

async function remove(req, res) {
  if (!supabase.isConfigured()) {
    return res.json({ success: true, data: { deleted: true } });
  }

  const client = supabase.getServiceClient();

  const { data: doc, error: fetchError } = await client
    .from('documents')
    .select('storage_path')
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .single();

  if (fetchError) throw ApiError.notFound('Document not found.');

  if (doc.storage_path) {
    await client.storage.from('documents').remove([doc.storage_path]);
  }

  const { error } = await client
    .from('documents')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id);

  if (error) throw ApiError.internal('Failed to delete document.');

  res.json({ success: true, data: { id: req.params.id, deleted: true } });
}

module.exports = { list, getById, remove };
