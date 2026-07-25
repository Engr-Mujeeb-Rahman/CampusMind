const gemini = require('../services/gemini');
const supabase = require('../services/supabase');
const vivaPrompt = require('../prompts/vivaPrompt');
const { VivaSchema } = require('../schemas');
const { saveArtifact } = require('../services/artifacts');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

async function generate(req, res) {
  const { project, document_id, count = 6 } = req.body;

  let inputProject = project;

  if (document_id && !inputProject && supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    const { data: doc } = await client
      .from('documents')
      .select('extracted_text, title')
      .eq('id', document_id)
      .eq('user_id', req.user.id)
      .single();

    if (doc) {
      inputProject = doc.title + '\n\n' + (doc.extracted_text || '').slice(0, 5000);
    }
  }

  if (!inputProject || typeof inputProject !== 'string' || inputProject.trim().length === 0) {
    throw ApiError.badRequest('A project or document is required.');
  }

  const preparedPrompt = vivaPrompt.build({
    project: inputProject.trim(),
    count: Math.min(Math.max(parseInt(count, 10) || 6, 1), 15),
  });

  const result = await gemini.generate(preparedPrompt);

  let parsed;
  try {
    const raw = JSON.parse(result.content);
    parsed = VivaSchema.parse(raw);
  } catch (err) {
    logger.error('Viva validation failed', err.message);
    throw ApiError.internal('Failed to generate valid viva questions. Please try again.');
  }

  const artifact = await saveArtifact({
    userId: req.user.id,
    documentId: document_id || null,
    type: 'viva',
    content: parsed,
    title: `Viva Questions (${parsed.length})`,
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
