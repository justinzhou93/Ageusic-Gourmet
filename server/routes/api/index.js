'use strict';


var router = require('express').Router();

router.use('/users', require('./user.router'));
router.use('/articles', require('./article.router'));
router.use('/hashes', require('./hash.router'));
router.use('/', require('./auth'));

module.exports = router;
