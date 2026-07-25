const { Router } = require('express');
const ctrl = require('../controllers/notes');
const auth = require('../middleware/auth');
const aiLimiter = require('../middleware/rateLimiter');

const router = Router();
router.use(auth);

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.post('/generate', aiLimiter, ctrl.generate);
router.delete('/:id', ctrl.remove);

module.exports = router;
