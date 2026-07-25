const gemini = require('../services/gemini');
const supabase = require('../services/supabase');
const summaryPrompt = require('../prompts/summaryPrompt');
const { SummarySchema } = require('../schemas');
const { saveArtifact } = require('../services/artifacts');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

async function generate(req, res) {
  const { content, document_id } = req.body;

  let inputContent = content;

  if (document_id && !inputContent && supabase.isConfigured()) {
    const client = supabase.getServiceClient();
    const { data: doc } = await client
      .from('documents')
      .select('extracted_text, title')
      .eq('id', document_id)
      .eq('user_id', req.user.id)
      .single();

    if (doc) {
      inputContent = doc.extracted_text;
    }
  }

  if (!inputContent || typeof inputContent !== 'string' || inputContent.trim().length === 0) {
    throw ApiError.badRequest('Content is required. Paste notes or provide a document_id.');
  }

  const preparedPrompt = summaryPrompt.build(inputContent.trim());
  const result = await gemini.generate(preparedPrompt);

  let parsed;
  try {
    const raw = JSON.parse(result.content);
    parsed = SummarySchema.parse(raw);
  } catch (err) {
    logger.error('Summary validation failed', err.message);
    throw ApiError.internal('Failed to generate a valid summary. Please try again.');
  }

  const artifact = await saveArtifact({
    userId: req.user.id,
    documentId: document_id || null,
    type: 'summary',
    content: parsed,
    title: parsed.title,
  });

  res.json({
    success: true,
    data: {
      artifactId: artifact?.id || null,
      summary: parsed,
    },
  });
}

module.exports = { generate };
