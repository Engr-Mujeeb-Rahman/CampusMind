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

module.exports = gemini;
