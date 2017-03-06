'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var Article = require('../../db/article');
var User = require('../../db/user');

router.param('id', function (req, res, next, id) {
  Article.findById(id)
  .then(function (article) {
    if (!article) throw HttpError(404);
    req.article = article;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  Article.findAll()
  .then(function (articles) {
    res.json(articles);
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
  res.json(req.story);
  // req.story.reload(Article.options.scopes.populated())
  // .then(function (article) {
  //   res.json(article);
  // })
  // .catch(next);
});

// router.put('/:id', function (req, res, next) {
//   req.story.update(req.body)
//   .then(function (article) {
//     return article.reload(Article.options.scopes.populated());
//   })
//   .then(function (storyIncludingAuthor) {
//     res.json(storyIncludingAuthor);
//   })
//   .catch(next);
// });
//
// router.delete('/:id', function (req, res, next) {
//   req.story.destroy()
//   .then(function () {
//     res.status(204).end();
//   })
//   .catch(next);
// });

module.exports = router;
