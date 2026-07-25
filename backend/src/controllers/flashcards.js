const gemini = require('../services/gemini');
const supabase = require('../services/supabase');
const flashcardPrompt = require('../prompts/flashcardPrompt');
const { FlashcardSchema } = require('../schemas');
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

  const preparedPrompt = flashcardPrompt.build(inputContent.trim());
  const result = await gemini.generate(preparedPrompt);

  let parsed;
  try {
    const raw = JSON.parse(result.content);
    parsed = FlashcardSchema.parse(raw);
  } catch (err) {
    logger.error('Flashcard validation failed', err.message);
    throw ApiError.internal('Failed to generate valid flashcards. Please try again.');
  }

  const artifact = await saveArtifact({
    userId: req.user.id,
    documentId: document_id || null,
    type: 'flashcards',
    content: parsed,
    title: `Flashcards (${parsed.length})`,
  });

  res.json({
    success: true,
    data: {
      artifactId: artifact?.id || null,
      cards: parsed,
    },
  });
}

module.exports = { generate };
