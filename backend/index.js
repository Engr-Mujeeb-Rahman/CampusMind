// Vercel entry point with error diagnostics
let handler;
try {
  const serverless = require('serverless-http');
  const app = require('./src/app');
  handler = serverless(app);
} catch (err) {
  // Capture any initialization error
  const errorMessage = err?.message || 'Unknown error';
  const errorStack = (err?.stack || 'No stack').split('\n').slice(0, 10).join('; ');
  const nodeVersion = process.version;
  const envKeys = Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('KEY') && !k.includes('TOKEN')).join(',');
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const hasSupabaseUrl = !!process.env.SUPABASE_URL;
  
  handler = (req, res) => {
    res.status(500).json({
      success: false,
      error: {
        message: errorMessage,
        stack: errorStack,
        nodeVersion,
        envKeys,
        hasOpenRouter,
        hasSupabaseUrl,
        cwd: process.cwd?.() || 'unknown',
      }
    });
  };
}

module.exports = handler;
