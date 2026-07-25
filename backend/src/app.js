const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const requestId = require('./middleware/requestId');

const app = express();
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(requestId);

app.get('/api/health', (req, res) => res.json({ status: 'ok', from: 'vercel-reqid' }));
module.exports = app;
