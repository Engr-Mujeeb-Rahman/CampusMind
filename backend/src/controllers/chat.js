const gemini = require('../services/gemini');
const chatPrompt = require('../prompts/chatPrompt');
const ApiError = require('../utils/ApiError');

async function send(req, res) {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw ApiError.badRequest('The "message" field is required and must be a non-empty string.');
  }

  const preparedPrompt = chatPrompt.build(message.trim());
  const result = await gemini.chat(preparedPrompt);

  res.json({
    success: true,
    data: {
      response: result.content,
    },
  });
}

module.exports = { send };
