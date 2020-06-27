const router = require('express').Router({ mergeParams: true });

const {
  getUser,
} = require('../controllers/users');

router.get('/me', getUser);

module.exports = router;
