import Sequelize from 'sequelize';
import db from './index';
const User = db.model('user');

var Hash = db.define('hash', {
  tag: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  }
})
