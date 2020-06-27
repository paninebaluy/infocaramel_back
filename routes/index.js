const router = require('express').Router();

const userData = require('./users');
const articleData = require('./articles');
const invalidUrl = require('./invalidRoutes');

router.use('/users', userData);
router.use('/articles', articleData);
router.use('*', invalidUrl);

module.exports = router;
