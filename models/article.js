const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
    minlength: 1,
  },
  title: {
    required: true,
    type: String,
    minlength: 2, // добавлены дополнительные ограничения на случай поломки NewsAPI,
    maxlength: 250, // чтобы в базу не сыпался мусор
  },
  text: {
    required: true,
    type: String,
    minlength: 2, // добавлены дополнительные ограничения на случай поломки NewsAPI,
    maxlength: 100000, // чтобы в базу не сыпался мусор (учитываем лонгриды до 100000 символов)
  },
  date: {
    required: true,
    type: Date,
    max: Date.now(), // проверяет, не в будущем ли дата
  },
  source: {
    required: true,
    type: String,
    minlength: 2, // добавлены дополнительные ограничения на случай поломки NewsAPI,
    maxlength: 250, // чтобы в базу не сыпался мусор
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: true, disallow_auth: true,
      }),
      message: 'Must be a Valid URL',
    },
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: true, disallow_auth: true,
      }),
      message: 'Must be a Valid URL',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    select: false, // чтобы API не возвращал данные о владельце
  },
});

module.exports = mongoose.model('article', articleSchema);
