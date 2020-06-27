require('dotenv').config(); // env-переменные добавлены в process.env

const express = require('express');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const helmet = require('helmet'); // sets HTTP headers for security
const { errors } = require('celebrate'); // validation middleware (checks data before passing it to controller)

const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middleware/error-handler');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { userValidator, loginValidator } = require('./middleware/validation-celebrate');
const { connectToMongoDB, rateLimiter } = require('./config');

const app = express();

app.use(helmet());

connectToMongoDB();

// initial middleware
app.use(bodyParser.json()); // for parsing data as JSON
app.use(bodyParser.urlencoded({ extended: true })); // accepting various file types in POST requests
app.use(cookies());
app.use(rateLimiter); // express rate limit is applied to all requests
app.use(requestLogger); // request logging middleware must be connected before all routes

// routes
app.post('/signin', loginValidator, login); // создаёт пользователя с переданными в теле email, password и name
app.post('/signup', userValidator, createUser); // проверяет переданные в теле почту и пароль и возвращает JWT
app.use(auth); // все следующие роуты защищены авторизацией
app.use('/', router);

// errors
app.use(errorLogger); // error logging middleware must be connected before error handlers
app.use(errors()); // celebrate error handler
app.use(errorHandler); // a centralized error handler is the last middleware

module.exports = app;
