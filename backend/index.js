// Minimal test for Vercel
module.exports = (req, res) => {
  res.json({ status: 'ok', from: 'vercel', url: req.url, method: req.method });
};
