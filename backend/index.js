module.exports = async (req, res) => {
  let expressApp;
  try {
    expressApp = require('./src/app');
    expressApp(req, res);
  } catch (err) {
    const msg = err?.message || 'unknown error';
    const stack = (err?.stack || '').split('\n').slice(0, 8).join('\n');
    res.status(500).json({
      success: false,
      error: { message: msg, stack, env: process.env.NODE_ENV || 'not set', hasKey: !!process.env.OPENROUTER_API_KEY }
    });
  }
};
