'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var rootPath = path.join(__dirname, '..', '..', '..');
var browserPath = path.join(rootPath, 'browser');
// var buildPath = path.join(rootPath, 'build');
var nodeModulesPath = path.join(rootPath, 'node_modules');
var publicPath = path.join(rootPath, 'public')

router.use(express.static(rootPath));
router.use(express.static(browserPath));
// router.use(express.static(buildPath));
router.use(express.static(nodeModulesPath));
router.use(express.static(publicPath));

module.exports = router;
