const gemini = require('../services/gemini');
const supabase = require('../services/supabase');
const { RevisionNotesSchema } = require('../schemas');
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

  const prompt =
    'Generate comprehensive revision notes from the following study material. ' +
    'Return valid JSON with this exact structure: ' +
    '{ "title": string, "subject": string, "keyConcepts": string[], "definitions": [{ "term": string, "definition": string }], "examTips": [{ "title": string, "detail": string }], "commonMistakes": string[] }\n\n' +
    `Material:\n${inputContent.trim()}\n\nRevision Notes JSON:`;

  const result = await gemini.generate(prompt);

  let parsed;
  try {
    const raw = JSON.parse(result.content);
    parsed = RevisionNotesSchema.parse(raw);
  } catch (err) {
    logger.error('Revision notes validation failed', err.message);
    throw ApiError.internal('Failed to generate valid revision notes. Please try again.');
  }

  const artifact = await saveArtifact({
    userId: req.user.id,
    documentId: document_id || null,
    type: 'revision_notes',
    content: parsed,
    title: parsed.title,
  });

  res.json({
    success: true,
    data: {
      artifactId: artifact?.id || null,
      notes: parsed,
    },
  });
}

async function list(req, res) {
  res.json({ data: [] });
}

async function getById(req, res) {
  res.json({ data: null });
}

async function create(req, res) {
  res.status(201).json({ data: req.body });
}

async function remove(req, res) {
  res.json({ data: { id: req.params.id, deleted: true } });
}

module.exports = { generate, list, getById, create, remove };
