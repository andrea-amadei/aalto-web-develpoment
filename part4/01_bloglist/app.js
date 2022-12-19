const config = require('./utils/config');

const cors = require('cors');
const errors = require('express-async-errors');
const blogsController = require('./controllers/blogs');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

logger.info(`Connecting to ${config.MONGODB_URI}...`);

mongoose.set('strictQuery', false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error(error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.extractToken);
app.use(middleware.extractUser);

app.use('/api/users', usersController);
app.use('/api/blogs', blogsController);
app.use('/api/login', loginController);

if (process.env.NODE_ENV === 'test') {
  const testController = require('./controllers/test');
  app.use('/api/testing', testController);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
