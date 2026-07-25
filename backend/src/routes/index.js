const { Router } = require('express');
const health = require('./health');
const notes = require('./notes');
const summary = require('./summary');
const flashcards = require('./flashcards');
const mcq = require('./mcq');
const viva = require('./viva');
const planner = require('./planner');
const chat = require('./chat');
const aiLimiter = require('../middleware/rateLimiter');

const router = Router();

router.use('/health', health);
router.use('/notes', notes);
router.use('/summary', aiLimiter, summary);
router.use('/flashcards', aiLimiter, flashcards);
router.use('/mcq', aiLimiter, mcq);
router.use('/viva', aiLimiter, viva);
router.use('/planner', aiLimiter, planner);
router.use('/chat', aiLimiter, chat);

module.exports = router;
