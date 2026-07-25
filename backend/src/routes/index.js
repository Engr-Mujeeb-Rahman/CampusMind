const { Router } = require('express');
const health = require('./health');
const authRoutes = require('./auth');
const documents = require('./documents');
const subjects = require('./subjects');
const upload = require('./upload');
const notes = require('./notes');
const artifactsRoute = require('./artifacts');
const summary = require('./summary');
const flashcards = require('./flashcards');
const mcq = require('./mcq');
const viva = require('./viva');
const planner = require('./planner');
const chat = require('./chat');
const workflow = require('./workflow');
const aiLimiter = require('../middleware/rateLimiter');

const router = Router();

router.use('/health', health);
router.use('/auth', authRoutes);
router.use('/documents', documents);
router.use('/subjects', subjects);
router.use('/upload', upload);
router.use('/notes', notes);
router.use('/artifacts', artifactsRoute);
router.use('/summary', aiLimiter, summary);
router.use('/flashcards', aiLimiter, flashcards);
router.use('/mcq', aiLimiter, mcq);
router.use('/viva', aiLimiter, viva);
router.use('/planner', aiLimiter, planner);
router.use('/chat', aiLimiter, chat);
router.use('/workflows', workflow);

module.exports = router;
