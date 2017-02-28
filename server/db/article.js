import Sequelize from 'sequelize';
import db from './index';
const User = db.user;
const Hash = db.hash;
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
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        set: function (value) {
            var arrayOfTags;
            if (typeof value === 'string') {
                arrayOfTags = value.split(',').map(function (s) {
                    return s.trim();
                });
                this.setDataValue('tags', arrayOfTags);
            } else {
                this.setDataValue('tags', value);
            }
        }
    }
}, {
    hooks: {
        beforeValidate: function (article) {
            if (article.title) {
                article.urlTitle = article.title.replace(/\s+/g, '_').replace(/\W/g, '');
            }
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
