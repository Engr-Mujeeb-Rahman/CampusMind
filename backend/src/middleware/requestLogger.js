const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, requestId } = req;
    const { statusCode } = res;

    const safeUrl = originalUrl.replace(/\/api\/chat\/send.*/, '/api/chat/send [redacted]');
    logger.info(`${method} ${safeUrl} ${statusCode} ${duration}ms [${requestId}]`);
  });

  next();
}

module.exports = requestLogger;
