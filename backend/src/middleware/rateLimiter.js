const rateLimit = require('express-rate-limit');

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'You are making requests too quickly. Please wait a moment and try again.',
      code: 'RATE_LIMITED',
    },
  },
});

module.exports = aiLimiter;
