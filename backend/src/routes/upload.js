const { Router } = require('express');
const multer = require('multer');
const ctrl = require('../controllers/upload');
const auth = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

const router = Router();
router.use(auth);

router.post('/', upload.single('file'), ctrl.uploadFile);

module.exports = router;
