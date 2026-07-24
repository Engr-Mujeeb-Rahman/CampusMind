const gemini = require('../services/gemini');
const vivaPrompt = require('../prompts/vivaPrompt');
const ApiError = require('../utils/ApiError');

async function generate(req, res) {
  const { project, count } = req.body;

  if (!project || typeof project !== 'string' || project.trim().length === 0) {
    throw ApiError.badRequest('The "project" field is required and must be a non-empty string.');
  }

  const preparedPrompt = vivaPrompt.build({
    project: project.trim(),
    count: typeof count === 'number' ? count : 5,
  });

  const result = await gemini.generate(preparedPrompt);

  res.json({
    success: true,
    data: { response: result.content },
  });
}

module.exports = { generate };
