const mongoose = require('mongoose');

const Article = require('../models/article');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

// GET /articles — возвращает все добавленные в избранное статьи
const getArticles = (async (req, res, next) => {
  try {
    const articles = await Article.find({})
      .sort({ createdAt: -1 });
    return res.status(200).send({ data: articles });
  } catch (err) {
    return next(err); // passes the data to errorHandler middleware
  }
});

// POST /articles — добавялет статью в избранное
const postArticle = (async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const article = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });
    return res.status(201).send({ data: article });
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
    const article = await Article.findById(id).select('+owner');
    if (!article) {
      return next(new NotFoundError('Not Found')); // здесь проверка, не удалена ли уже статья из избранного
    }
    if (!article.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const articleToDelete = await Article.findByIdAndRemove(id);
    return res.status(200).send({ message: 'article deleted:', data: articleToDelete });
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
