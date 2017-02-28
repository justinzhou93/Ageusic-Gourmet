'use strict';

var Sequelize = require('sequelize');

var databaseURI = 'postgres://localhost:5432/foodBlog';

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

var Article = require('./db/article.model');
var User = require('./db/user.model');
var Hash = require('./db/hash.model');

User.hasMany(Article, {
  foreignKey: 'author_id',
  onDelete: 'cascade', // remove all associated stories
  hooks: true // makes the cascade actually work. Yay Sequelize!
});

Article.belongsTo(User, {as: 'author'});

module.exports = db;
