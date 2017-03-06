const Sequelize = require('sequelize');
const db = require('./_db');

var Hash = db.define('hash', {
  tag: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  }
})

module.exports = Hash;
