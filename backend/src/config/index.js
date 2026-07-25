require('dotenv').config();

const requiredInProduction = ['GEMINI_API_KEY'];
const missing = [];

if (process.env.NODE_ENV === 'production') {
  for (const key of requiredInProduction) {
    if (!process.env[key]) missing.push(key);
  }
}

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables in production: ${missing.join(', ')}`
  );
}

const config = {
  port: parseInt(process.env.PORT, 10) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  },
  n8n: {
    webhookBaseUrl: process.env.N8N_WEBHOOK_BASE_URL || 'http://localhost:5678',
  },
};

module.exports = config;
