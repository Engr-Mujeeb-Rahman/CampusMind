require('express-async-errors');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
