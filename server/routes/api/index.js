'use strict';


var router = require('express').Router();

router.use('/users', require('./user.router'));

router.use('/stories', require('./article.router'));

router.use('/', require('./auth'));

module.exports = router;
