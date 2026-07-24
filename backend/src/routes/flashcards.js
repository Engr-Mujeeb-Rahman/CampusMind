const { Router } = require('express');
const ctrl = require('../controllers/flashcards');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);

module.exports = router;
