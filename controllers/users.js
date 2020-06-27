const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const BadRequestError = require('../errors/badRequestError');

const { JWT_SECRET } = require('../config');

// GET /users/me- возвращает информацию о текущем пользователе
const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(req.user);
    if (!user) {
      throw new NotFoundError('Not Found');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

// POST /users — создаёт пользователя
const createUser = (async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    });
    return res.status(201).send({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    }); // данные всех полей должны приходить в теле запроса (кроме пароля)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err); // passes the data to error handler
  }
});

// login - получает из запроса почту и пароль и проверяет их
const login = (async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '10d' },
    );
    res.cookie('jwt', token, JWT_SECRET, { // JWT после создания должен быть отправлен клиенту
      maxAge: '10d',
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(200).send({ token });
  } catch (err) {
    next(new UnauthorizedError(err.message)); // passes the data to error handler
  }
});

module.exports = {
  getUser,
  createUser,
  login,
};
