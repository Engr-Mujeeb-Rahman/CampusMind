const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const requestId = require('./middleware/requestId');
const requestLogger = require('./middleware/requestLogger');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use(requestId);
app.use(requestLogger);

app.get('/api/health', (req, res) => res.json({ status: 'ok', from: 'vercel-mw', requestId: req.requestId }));
app.get('*', (req, res) => res.json({ ok: true, path: req.path }));

module.exports = app;
