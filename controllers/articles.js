const mongoose = require('mongoose');

const Article = require('../models/article');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

// GET /articles — возвращает все добавленные в избранное статьи
const getArticles = (async (req, res, next) => {
  try {
    const cards = await Article.find({})
      .sort({ createdAt: -1 })
      .populate('likes')
      .populate('owner');
    return res.status(200).send({ data: cards });
  } catch (err) {
    return next(err); // passes the data to errorHandler middleware
  }
});

// POST /articles — добавялет статью в избранное
const postArticle = (async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Article.create({ name, link, owner: req.user._id });
    return res.status(201).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err); // passes the data to error handler
  }
});

// DELETE /articles/articleId — удаляет статью из избранного по идентификатору
const deleteArticle = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Article.findById(id);
    if (!card) {
      return next(new NotFoundError('Not Found')); // здесь проверка, не удалена ли уже карточка
    }
    if (!card.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const cardToDelete = await Article.findByIdAndRemove(id)
      .populate('likes').populate('owner');
    return res.status(200).send({ message: 'card deleted:', data: cardToDelete });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('Not Found'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
};
