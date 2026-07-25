const gemini = require('../services/gemini');
const plannerPrompt = require('../prompts/plannerPrompt');
const { StudyPlanSchema } = require('../schemas');
const supabase = require('../services/supabase');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

async function generate(req, res) {
  const { subject, deadline, hoursPerDay } = req.body;

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    throw ApiError.badRequest('The "subject" field is required.');
  }
  if (!deadline || typeof deadline !== 'string' || deadline.trim().length === 0) {
    throw ApiError.badRequest('The "deadline" field is required.');
  }

  const preparedPrompt = plannerPrompt.build({
    subject: subject.trim(),
    deadline: deadline.trim(),
    hoursPerDay: hoursPerDay || '2 hours',
  });

  const result = await gemini.generate(preparedPrompt);

  let parsed;
  try {
    const raw = JSON.parse(result.content);
    parsed = StudyPlanSchema.parse(raw);
  } catch (err) {
    logger.error('Study plan validation failed', err.message);
    throw ApiError.internal('Failed to generate a valid study plan. Please try again.');
  }

  if (supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    await client.from('study_plans').insert({
      user_id: req.user.id,
      exam_date: deadline,
      hours_per_day: parseInt(hoursPerDay, 10) || 2,
      subjects: [subject.trim()],
      plan: parsed,
    });
  }

  res.json({
    success: true,
    data: {
      plan: parsed,
    },
  });
}

module.exports = { generate };
