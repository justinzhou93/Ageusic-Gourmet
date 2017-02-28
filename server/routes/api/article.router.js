'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var Article = require('../../db/article');
var User = require('../../db/user');

router.param('id', function (req, res, next, id) {
  Article.findById(id)
  .then(function (story) {
    if (!story) throw HttpError(404);
    req.story = story;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  Article.scope('populated').findAll({
    attributes: { exclude: ['paragraphs'] }
  })
  .then(function (stories) {
    res.json(stories);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Article.create(req.body)
  .then(function (story) {
    return story.reload(Article.options.scopes.populated());
  })
  .then(function (storyIncludingAuthor) {
    res.status(201).json(storyIncludingAuthor);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  req.story.reload(Article.options.scopes.populated())
  .then(function (story) {
    res.json(story);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  req.story.update(req.body)
  .then(function (story) {
    return story.reload(Article.options.scopes.populated());
  })
  .then(function (storyIncludingAuthor) {
    res.json(storyIncludingAuthor);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.story.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
