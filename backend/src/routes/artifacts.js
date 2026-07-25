const { Router } = require('express');
const auth = require('../middleware/auth');
const { getArtifact, listArtifacts } = require('../services/artifacts');
const ApiError = require('../utils/ApiError');

const router = Router();
router.use(auth);

router.get('/', async (req, res) => {
  const { type, document_id } = req.query;
  const data = await listArtifacts({
    userId: req.user.id,
    type: type || null,
    documentId: document_id || null,
  });
  res.json({ success: true, data });
});

router.get('/:id', async (req, res) => {
  const artifact = await getArtifact(req.params.id, req.user.id);
  if (!artifact) throw ApiError.notFound('Artifact not found.');
  res.json({ success: true, data: artifact });
});

router.get('/:id/download', async (req, res) => {
  const artifact = await getArtifact(req.params.id, req.user.id);
  if (!artifact) throw ApiError.notFound('Artifact not found.');

  const filename = `${artifact.title || 'artifact'}.json`.replace(/[^a-zA-Z0-9_\-.]/g, '_');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/json');
  res.json(artifact.content);
});

module.exports = router;
