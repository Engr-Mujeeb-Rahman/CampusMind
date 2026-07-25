const gemini = require('../services/gemini');
const chatPrompt = require('../prompts/chatPrompt');
const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

async function send(req, res) {
  const { message, document_id } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw ApiError.badRequest('The "message" field is required and must be a non-empty string.');
  }

  const userId = req.user.id;

  let documentText = '';
  let documentTitle = '';

  if (document_id && supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    const { data: doc, error } = await client
      .from('documents')
      .select('extracted_text, title')
      .eq('id', document_id)
      .eq('user_id', userId)
      .single();

    if (!error && doc) {
      documentText = doc.extracted_text || '';
      documentTitle = doc.title || '';
    }
  }

  const preparedPrompt = chatPrompt.buildWithContext(message.trim(), documentText, documentTitle);

  if (supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    await client.from('chat_messages').insert({
      document_id: document_id || null,
      user_id: userId,
      role: 'user',
      content: message.trim(),
    });
  }

  const result = await gemini.chat(preparedPrompt);

  if (supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    await client.from('chat_messages').insert({
      document_id: document_id || null,
      user_id: userId,
      role: 'assistant',
      content: result.content,
    });
  }

  res.json({
    success: true,
    data: {
      response: result.content,
    },
  });
}

async function history(req, res) {
  const { document_id } = req.query;

  if (!document_id) {
    return res.json({ success: true, data: [] });
  }

  if (!supabase.isConfigured()) {
    return res.json({ success: true, data: [] });
  }

  const client = supabase.getServiceClient();
  const { data, error } = await client
    .from('chat_messages')
    .select('id, role, content, created_at')
    .eq('document_id', document_id)
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: true });

  if (error) {
    logger.error('Failed to fetch chat history', error.message);
    return res.json({ success: true, data: [] });
  }

  res.json({ success: true, data });
}

module.exports = { send, history };
