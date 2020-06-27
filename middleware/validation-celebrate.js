const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');

const errors = {
  name: new BadRequestError('Name must contain 2 to 30 symbols. Cyrillic and Latin symbols and a dash (-) are allowed; no whitespaces.'),
  email: new BadRequestError('Valid email address is required.'),
  password: new BadRequestError('Password must contain 8 to 24 characters. Letters from a to z, numbers and special chars are allowed.'),
  link: new BadRequestError('Link must be a valid URL.'),
  id: new BadRequestError('Must be a Mongoose ObjectID.'),
  login: new UnauthorizedError('The email or password you entered are not valid.'),
  keyword: new BadRequestError('Article must have at least one keyword.'),
  title: new BadRequestError('Article must have a title; max size is 250 symbols.'),
  text: new BadRequestError('Article must have text; max size is 100 000 symbols.'),
  date: new BadRequestError('Creation date of the article must be valid.'),
  source: new BadRequestError('Source must have a name; max size is 250 symbols.'),
};

const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(errors.email),
    password: Joi.string().required().min(8)
      .regex(/[a-z0-9-+_=&?!.,%^:;<>#@*()~'"|\\/]{8,24}/i)
      .error(errors.password),
    name: Joi.string().required().min(2).max(30)
      .regex(/^([a-zа-яё-]{2,30})$/i) // только имя, разрешен дефис
      .error(errors.name),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(errors.login),
    password: Joi.string().required().min(8)
      .error(errors.login),
  }),
});

const articleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(1)
      .error(errors.keyword),
    title: Joi.string().required().min(2).max(250)
      .error(errors.title),
    text: Joi.string().required().min(2).max(100000)
      .error(errors.text),
    date: Joi.date().required().max(Date.now())
      .error(errors.date),
    source: Joi.string().required().min(2).max(250)
      .error(errors.source),
    link: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/=]*)?$/)
      .error(errors.link),
    image: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/=]*)?$/)
      .error(errors.link),
  }),
});

const mongooseObjectIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex()
      .error(errors.id),
  }),
});

module.exports = {
  userValidator,
  loginValidator,
  articleValidator,
  // profileUpdateValidator,
  mongooseObjectIdValidator,
};
