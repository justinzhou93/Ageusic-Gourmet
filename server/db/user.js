const Sequelize = require('sequelize');
const db = require('./_db');
const Hash = require('./hash');
const Article = require('./article');

var User = db.define('user', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
  },
  numArticleTags:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
  },
  tags: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
      // set: function (value) {
      //     var arrayOfTags;
      //     if (typeof value === 'string') {
      //         arrayOfTags = value.split(',').map(function (s) {
      //             return s.trim();
      //         });
      //         this.setDataValue('tags', arrayOfTags);
      //     } else {
      //         this.setDataValue('tags', value);
      //     }
      // }
  },
  recommendations: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
}, {
  getterMethods: {
      tagPercentageSpread: function(){
          return this.tags.map(tag => tag / this.numArticleTags);
      }
  },
  instanceMethods: {
      updateUserSpread: function(tags){
          var arrayofTags = this.getDataValue('tags');
          Hash.findAll({
              where: {
                  tag: {
                      $in: [tags]
                  }
              }
          })
          .then(foundTag => arrayofTags[foundTag.id]++);
          //update number of articles read
          this.setDataValue('numArticleTags', this.numArticleTags + tags.length);
      }
  },
  classMethods: {
      updateTags: function(){
          var updatedTags = User.getDataValue('tags').push(0);
          User.setDataValue('tags', updatedTags);
      }
      // ,
      // getUserWithRecs: function(userId){
      //   var foundUser = User.findAll({
      //     where: {
      //       id: userId
      //     }
      //   });
      //   var userRecommendations = Article.findAll()
      // }
  }
});


module.exports = User
