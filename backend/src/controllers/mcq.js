async function list(req, res) {
  res.json({ data: [] });
}

async function generate(req, res) {
  res.json({ data: { questions: [], generatedAt: new Date().toISOString() } });
}

module.exports = { list, generate };
