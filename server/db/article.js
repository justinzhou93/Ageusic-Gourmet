const Sequelize = require('sequelize');
const db = require('./_db');
const User = require('./user');
const Hash = require('./hash');
var marked = require('marked');

var Article = db.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    numArticleTags: {
        type: Sequelize.INTEGER
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
    }
}, {
    hooks: {
        beforeValidate: function (article) {
            if (article.title) {
                article.urlTitle = article.title.replace(/\s+/g, '_').replace(/\W/g, '');
            }
            article.numArticleTags = article.tags.reduce((tot, tag) => tot + tag, 0);
        }
    },
    getterMethods: {
        route: function () {
            return this.urlTitle;
        },
        renderedContent: function () {
            return marked(this.content);
        },
        tagPercentageSpread: function(){
            return this.tags.map(tag => tag / this.numArticleTags);
        }
    },
    classMethods: {
        findByTag: function (tag) {
            return Article.findAll({
                where: {
                    tags: {
                        $overlap: [tag]
                    }
                }
            });
        },
        updateTags: function(){
            var updatedTags = User.getDataValue('tags').push(0);
            User.setDataValue('tags', updatedTags);
        }
    },
    instanceMethods: {
        findSimilar: function () {
            return Article.findAll({
                where: {
                    tags: {
                        $overlap: this.tags
                    },
                    id: {
                        $ne: this.id
                    }
                }
            });
        },
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
    }
});

module.exports = Article;
