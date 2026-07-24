const gemini = require('../services/gemini');
const summaryPrompt = require('../prompts/summaryPrompt');
const ApiError = require('../utils/ApiError');

async function generate(req, res) {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    throw ApiError.badRequest('The "content" field is required and must be a non-empty string.');
  }

  const preparedPrompt = summaryPrompt.build(content.trim());
  const result = await gemini.generate(preparedPrompt);

  res.json({
    success: true,
    data: { response: result.content },
  });
}

module.exports = { generate };
