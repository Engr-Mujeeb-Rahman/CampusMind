const { Router } = require('express');
const ctrl = require('../controllers/mcq');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.get('/', ctrl.list);
router.post('/generate', ctrl.generate);

module.exports = router;
