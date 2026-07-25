require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const requestId = require('./middleware/requestId');
const requestLogger = require('./middleware/requestLogger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use(requestId);
app.use(requestLogger);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
