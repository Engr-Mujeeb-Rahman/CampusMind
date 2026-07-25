const n8n = require('../services/n8n');
const gemini = require('../services/gemini');
const ApiError = require('../utils/ApiError');

function buildCombinedPrompt(content) {
  return (
    'You are an AI academic assistant. Given the following study content, generate four study aids. ' +
    'Return ONLY valid JSON with this exact structure (no markdown, no explanation):\n' +
    '{\n' +
    '  "summary": { "title": string, "intro": string, "keyTakeaways": string[], "definitions": [{ "term": string, "definition": string }] },\n' +
    '  "flashcards": [{ "question": string, "answer": string }],\n' +
    '  "mcqs": [{ "question": string, "options": string[4], "correctIndex": number, "explanation": string }],\n' +
    '  "viva": [{ "category": string, "level": "Beginner" | "Intermediate" | "Advanced", "question": string, "idealAnswer": string }]\n' +
    '}\n\n' +
    'Generate exactly 5 flashcards, 5 MCQs, and 5 viva questions.\n\n' +
    `Content:\n${content}\n\nJSON:`
  );
}

async function smartNotes(req, res) {
  const { content } = req.body;

  console.log('[workflow.smartNotes] Request received', {
    contentLength: content?.length,
    contentType: typeof content,
    bodyKeys: Object.keys(req.body),
  });

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    console.warn('[workflow.smartNotes] Validation failed — content empty or not a string');
    throw ApiError.badRequest('The "content" field is required and must be a non-empty string.');
  }

  const trimmedContent = content.trim();

  try {
    console.log('[workflow.smartNotes] Calling n8n.triggerWorkflow', { contentLength: trimmedContent.length });
    const result = await n8n.triggerWorkflow('smart-notes', { content: trimmedContent });
    console.log('[workflow.smartNotes] n8n response received', { resultKeys: Object.keys(result), hasData: !!result.data });
    return res.json({ success: true, data: result.data });
  } catch (err) {
    console.log('[workflow.smartNotes] n8n failed, falling back to OpenRouter', { error: err.message });
  }

  const prompt = buildCombinedPrompt(trimmedContent);
  const result = await gemini.generate(prompt);

  console.log('[workflow.smartNotes] AI response received', { responseLength: result.content?.length });

  let data;
  try {
    data = JSON.parse(result.content);
  } catch {
    data = { raw: result.content };
  }

  res.json({ success: true, data });
}

module.exports = { smartNotes };
