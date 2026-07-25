const config = require('../config');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

const AI_TIMEOUT_MS = 120000;

function extractJson(text) {
  const match = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
  if (match) {
    const extracted = match[1].trim();
    try {
      JSON.parse(extracted);
      return extracted;
    } catch {
      return text;
    }
  }
  return text;
}

async function callOpenRouter(prompt) {
  const { apiKey, model, baseUrl } = config.openrouter;

  if (!apiKey) {
    throw ApiError.internal('OpenRouter API key not configured. Set OPENROUTER_API_KEY in .env.');
  }

  const body = {
    model,
    messages: [{ role: 'user', content: prompt }],
  };

  logger.debug('OpenRouter.call', { model, promptLength: prompt.length });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      logger.error('OpenRouter returned error', {
        status: response.status,
        body: text,
      });

      if (response.status === 401) {
        throw ApiError.badRequest('Invalid or missing OpenRouter API key');
      }
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        const waitMsg = retryAfter
          ? `Please wait ${retryAfter} seconds and try again.`
          : 'Please wait a moment and try again.';
        throw ApiError.tooMany(`Our AI service is temporarily busy. ${waitMsg}`);
      }
      throw ApiError.internal(`OpenRouter request failed (HTTP ${response.status})`);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content || '';
    const content = extractJson(rawContent);
    return { role: 'assistant', content };
  } catch (err) {
    clearTimeout(timer);

    if (err instanceof ApiError) throw err;

    if (err.name === 'AbortError') {
      logger.error('OpenRouter request timed out', { timeoutMs: AI_TIMEOUT_MS });
      throw ApiError.internal('OpenRouter request timed out', 'AI_TIMEOUT');
    }

    logger.error('OpenRouter request failed', { error: err.message });
    throw ApiError.internal('AI request failed', err.message);
  }
}

const ai = {
  async generate(prompt) {
    logger.debug('AI.generate', { promptLength: prompt.length });
    return callOpenRouter(prompt);
  },

  async chat(message) {
    logger.debug('AI.chat', { messageLength: message.length });
    return callOpenRouter(message);
  },
};

module.exports = ai;

/*
=== ORIGINAL GEMINI IMPLEMENTATION (preserved for reference) ===

const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

let client = null;

function getClient() {
  if (!client) {
    if (!config.gemini.apiKey) {
      throw ApiError.internal('Gemini API key not configured. Set GEMINI_API_KEY in .env.');
    }
    client = new GoogleGenerativeAI(config.gemini.apiKey);
  }
  return client;
}

function getModel() {
  return getClient().getGenerativeModel({ model: config.gemini.model });
}

const gemini = {
  async generate(prompt) {
    logger.debug('Gemini.generate', { promptLength: prompt.length });
    try {
      const model = getModel();
      const result = await model.generateContent(prompt);
      const text = result.response?.text?.() || '';
      return { role: 'assistant', content: text };
    } catch (err) {
      logger.error('Gemini generate failed', err.message);
      if (err.message?.includes('API_KEY')) {
        throw ApiError.badRequest('Invalid or missing Gemini API key');
      }
      throw ApiError.internal('AI generation failed', err.message);
    }
  },

  async chat(message) {
    logger.debug('Gemini.chat', { messageLength: message.length });
    try {
      const model = getModel();
      const result = await model.generateContent(message);
      const text = result.response?.text?.() || '';
      return { role: 'assistant', content: text };
    } catch (err) {
      logger.error('Gemini chat failed', err.message);
      if (err.message?.includes('API_KEY')) {
        throw ApiError.badRequest('Invalid or missing Gemini API key');
      }
      throw ApiError.internal('AI chat failed', err.message);
    }
  },
};
*/
