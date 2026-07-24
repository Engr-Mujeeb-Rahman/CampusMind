const gemini = require('../services/gemini');
const ApiError = require('../utils/ApiError');

async function send(req, res) {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw ApiError.badRequest('The "message" field is required and must be a non-empty string.');
  }

  const result = await gemini.chat(message.trim());

  res.json({
    success: true,
    data: {
      response: result.content,
    },
  });
}

module.exports = { send };
