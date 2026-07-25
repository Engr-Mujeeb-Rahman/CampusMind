const gemini = require('../services/gemini');
const supabase = require('../services/supabase');
const mcqPrompt = require('../prompts/mcqPrompt');
const { MCQSchema } = require('../schemas');
const { saveArtifact } = require('../services/artifacts');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

async function generate(req, res) {
  const { topic, document_id, count = 5, difficulty = 'medium' } = req.body;

  let inputTopic = topic;

  if (document_id && !inputTopic && supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    const { data: doc } = await client
      .from('documents')
      .select('extracted_text, title')
      .eq('id', document_id)
      .eq('user_id', req.user.id)
      .single();

    if (doc) {
      inputTopic = doc.extracted_text.slice(0, 6000);
    }
  }

  if (!inputTopic || typeof inputTopic !== 'string' || inputTopic.trim().length === 0) {
    throw ApiError.badRequest('A topic is required. Enter one or provide a document_id.');
  }

  const preparedPrompt = mcqPrompt.build({
    topic: inputTopic.trim(),
    count: Math.min(Math.max(parseInt(count, 10) || 5, 1), 20),
    difficulty: difficulty || 'medium',
  });

  const result = await gemini.generate(preparedPrompt);

  let parsed;
  try {
    const raw = JSON.parse(result.content);
    parsed = MCQSchema.parse(raw);
  } catch (err) {
    logger.error('MCQ validation failed', err.message);
    throw ApiError.internal('Failed to generate valid MCQs. Please try again.');
  }

  const artifact = await saveArtifact({
    userId: req.user.id,
    documentId: document_id || null,
    type: 'mcq',
    content: parsed,
    title: `${inputTopic.slice(0, 50)} MCQ`,
  });

  res.json({
    success: true,
    data: {
      artifactId: artifact?.id || null,
      questions: parsed,
    },
  });
}

module.exports = { generate };
