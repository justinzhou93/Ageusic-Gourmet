'use strict';

var db = require('./_db');

var Article = require('./article');
var User = require('./user');

// User.hasMany(Article, {
//   foreignKey: 'author_id',
//   onDelete: 'cascade', // remove all associated stories
//   hooks: true // makes the cascade actually work. Yay Sequelize!
// });
// Article.belongsTo(User, {as: 'author'});

module.exports = db;
