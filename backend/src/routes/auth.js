const { Router } = require('express');
const ctrl = require('../controllers/auth');

const router = Router();

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/me', ctrl.me);

module.exports = router;
