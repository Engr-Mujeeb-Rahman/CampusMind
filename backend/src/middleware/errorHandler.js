const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

function errorHandler(err, req, res, _next) {
  if (err instanceof ApiError) {
    logger.warn(`${err.statusCode} — ${err.message}`);
    return res.status(err.statusCode).json({
      error: { message: err.message, details: err.details },
    });
  }

  logger.error(`Unhandled error: ${err.message}`, err.stack);
  res.status(500).json({
    error: { message: 'Internal server error' },
  });
}

module.exports = errorHandler;
