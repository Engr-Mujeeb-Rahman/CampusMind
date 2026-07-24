const { Router } = require('express');
const ctrl = require('../controllers/viva');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);
router.get('/', ctrl.list);

module.exports = router;
