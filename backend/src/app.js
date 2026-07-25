const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', from: 'vercel-config-test' }));
module.exports = app;
