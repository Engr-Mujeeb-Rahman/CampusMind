const gemini = require('../services/gemini');
const plannerPrompt = require('../prompts/plannerPrompt');
const ApiError = require('../utils/ApiError');

async function generate(req, res) {
  const { subject, deadline, hoursPerDay } = req.body;

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    throw ApiError.badRequest('The "subject" field is required and must be a non-empty string.');
  }
  if (!deadline || typeof deadline !== 'string' || deadline.trim().length === 0) {
    throw ApiError.badRequest('The "deadline" field is required and must be a non-empty string.');
  }

  const preparedPrompt = plannerPrompt.build({
    subject: subject.trim(),
    deadline: deadline.trim(),
    hoursPerDay: hoursPerDay || '2 hours',
  });

  const result = await gemini.generate(preparedPrompt);

  res.json({
    success: true,
    data: { response: result.content },
  });
}

module.exports = { generate };
