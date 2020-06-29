const invalidUrl = require('express').Router({ mergeParams: true });
const NotFoundError = require('../errors/notFoundError');

invalidUrl.all('*', (req, res, next) => {
  next(new NotFoundError('Not Found'));
});

module.exports = invalidUrl;
