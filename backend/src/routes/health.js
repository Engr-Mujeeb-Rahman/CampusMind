const { Router } = require('express');
const ctrl = require('../controllers/health');

const router = Router();
router.get('/', ctrl.get);

module.exports = router;
