const router = require('express').Router({ mergeParams: true });

const {
  getArticles, postArticle, deleteArticle,
} = require('../controllers/articles');
const { articleValidator, mongooseObjectIdValidator } = require('../middleware/validation-celebrate');

router.get('/', getArticles); // возвращает все сохранённые пользователем статьи
router.post('/', articleValidator, postArticle); // создаёт статью с переданными в теле keyword, title, text, date, source, link и image
router.delete('/:id', mongooseObjectIdValidator, deleteArticle); // удаляет сохранённую статью  по _id

module.exports = router;
