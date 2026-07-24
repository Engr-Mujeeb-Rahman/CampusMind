const gemini = require('../services/gemini');
const mcqPrompt = require('../prompts/mcqPrompt');
const ApiError = require('../utils/ApiError');

async function generate(req, res) {
  const { topic, count, difficulty } = req.body;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    throw ApiError.badRequest('The "topic" field is required and must be a non-empty string.');
  }

  const preparedPrompt = mcqPrompt.build({
    topic: topic.trim(),
    count: typeof count === 'number' ? count : 5,
    difficulty: difficulty || 'medium',
  });

  const result = await gemini.generate(preparedPrompt);

  res.json({
    success: true,
    data: { response: result.content },
  });
}

module.exports = { generate };
