const { Router } = require('express');
const ctrl = require('../controllers/documents');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.delete('/:id', ctrl.remove);

module.exports = router;
