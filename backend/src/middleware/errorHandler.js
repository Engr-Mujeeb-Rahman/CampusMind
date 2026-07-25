const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

function errorHandler(err, req, res, _next) {
  const requestId = req.requestId || 'none';

  if (err instanceof ApiError) {
    logger.warn(`${err.statusCode} — ${err.message} [${requestId}]`);
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code || 'VALIDATION_ERROR',
      },
    });
  }

  logger.error(`Unhandled error: ${err.message} [${requestId}]`, err.stack);
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}

module.exports = errorHandler;
