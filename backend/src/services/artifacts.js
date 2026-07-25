const supabase = require('./supabase');
const logger = require('../utils/logger');

async function saveArtifact({ userId, documentId, type, content, title }) {
  if (!supabase.isConfigured()) {
    return { id: 'dev-' + Date.now(), type, title };
  }

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('artifacts')
    .insert({
      user_id: userId,
      document_id: documentId || null,
      type,
      content,
      title: title || null,
    })
    .select()
    .single();

  if (error) {
    logger.error('Failed to save artifact', error.message);
    return null;
  }

  return data;
}

async function getArtifact(id, userId) {
  if (!supabase.isConfigured()) return null;

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('artifacts')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data;
}

async function listArtifacts({ userId, type, documentId, limit = 50 }) {
  if (!supabase.isConfigured()) return [];

  const client = supabase.getServiceClient();
  let query = client
    .from('artifacts')
    .select('id, type, title, document_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type) query = query.eq('type', type);
  if (documentId) query = query.eq('document_id', documentId);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

module.exports = { saveArtifact, getArtifact, listArtifacts };
