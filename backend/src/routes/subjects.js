const { Router } = require('express');
const ctrl = require('../controllers/subjects');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.delete('/:id', ctrl.remove);

module.exports = router;
