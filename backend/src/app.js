const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/api/health', (req, res) => res.json({ status: 'ok', from: 'vercel-simple' }));
app.get('*', (req, res) => res.json({ ok: true, path: req.path, method: req.method }));

module.exports = app;
