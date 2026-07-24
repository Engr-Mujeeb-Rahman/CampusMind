const { Router } = require('express');
const ctrl = require('../controllers/viva');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);
router.post('/generate', ctrl.generate);

module.exports = router;
