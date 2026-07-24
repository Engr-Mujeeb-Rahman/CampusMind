const config = require('../config');
const logger = require('../utils/logger');

const gemini = {
  async generate(prompt) {
    logger.debug('Gemini.generate called — not yet implemented', { promptLength: prompt.length });
    return { role: 'assistant', content: '[Gemini response placeholder]' };
  },

  async chat(messages) {
    logger.debug('Gemini.chat called — not yet implemented', { messageCount: messages.length });
    return { role: 'assistant', content: '[Gemini chat placeholder]' };
  },
};

module.exports = gemini;
