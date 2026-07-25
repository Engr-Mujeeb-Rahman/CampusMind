const { Router } = require('express');
const ctrl = require('../controllers/workflow');
const auth = require('../middleware/auth');
const aiLimiter = require('../middleware/rateLimiter');

const router = Router();
router.use(auth);
router.use(aiLimiter);

router.post('/smart-notes', ctrl.smartNotes);

module.exports = router;
