'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var Hash = require('../../db/hash');

router.param('id', function (req, res, next, id) {
  Hash.findById(id)
  .then(function (hash) {
    if (!hash) throw HttpError(404);
    req.hash = hash;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  Hash.findAll()
  .then(function (hashes) {
    res.json(hashes);
  })
  .catch(next);
});

// router.post('/', function (req, res, next) {
//   Article.create(req.body)
//   .then(function (article) {
//     return article.reload(Article.options.scopes.populated());
//   })
//   .then(function (articleIncludingAuthor) {
//     res.status(201).json(articleIncludingAuthor);
//   })
//   .catch(next);
// });

router.get('/:id', function (req, res, next) {
  res.json(req.hash);
});

module.exports = router;
