const router = require('express').Router({ mergeParams: true });

const {
  getUser,
} = require('../controllers/users');
const {
  mongooseObjectIdValidator,
} = require('../middleware/validation-celebrate');

router.get('/me', mongooseObjectIdValidator, getUser);

module.exports = router;
