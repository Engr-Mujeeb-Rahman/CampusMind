async function generate(req, res) {
  res.json({ data: { plan: [], generatedAt: new Date().toISOString() } });
}

module.exports = { generate };
