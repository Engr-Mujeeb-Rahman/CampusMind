const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

// Start server for local dev (Vercel uses its own serverless entrypoint)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
if (!isVercel) {
  app.listen(config.port, () => {
    logger.info(`Backend running → http://localhost:${config.port} (${config.nodeEnv})`);
  });
}

// Required for Vercel serverless deployment
module.exports = app;
