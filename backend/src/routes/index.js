const { Router } = require('express');
const health = require('./health');
const notes = require('./notes');
const flashcards = require('./flashcards');
const mcq = require('./mcq');
const viva = require('./viva');
const planner = require('./planner');
const chat = require('./chat');

const router = Router();

router.use('/health', health);
router.use('/notes', notes);
router.use('/flashcards', flashcards);
router.use('/mcq', mcq);
router.use('/viva', viva);
router.use('/planner', planner);
router.use('/chat', chat);

module.exports = router;
