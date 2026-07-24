async function list(req, res) {
  res.json({ data: [] });
}

async function getById(req, res) {
  res.json({ data: null });
}

async function create(req, res) {
  res.status(201).json({ data: req.body });
}

async function remove(req, res) {
  res.json({ data: { id: req.params.id, deleted: true } });
}

module.exports = { list, getById, create, remove };
