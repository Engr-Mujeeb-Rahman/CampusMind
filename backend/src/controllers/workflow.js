const n8n = require('../services/n8n');
const ApiError = require('../utils/ApiError');

async function smartNotes(req, res) {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    throw ApiError.badRequest('The "content" field is required and must be a non-empty string.');
  }

  const result = await n8n.triggerWorkflow('smart-notes', { content: content.trim() });

  res.json({
    success: true,
    data: result.data,
  });
}

module.exports = { smartNotes };
