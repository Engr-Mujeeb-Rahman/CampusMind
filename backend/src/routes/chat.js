const { Router } = require('express');
const ctrl = require('../controllers/chat');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);
router.post('/send', ctrl.send);

module.exports = router;
