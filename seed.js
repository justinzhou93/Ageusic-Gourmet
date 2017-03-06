// const User = require('/server/db/user');
// const Hash = require('/server/')

var Promise = require('bluebird');
var db = require('./server/db/_db.js');
var User = require('./server/db/user');
var Article = require('./server/db/article');
var Hash = require('./server/db/hash');

var data = {
  user: [
    {
      id: 1,
      name: "justin",
      email: "justin@gmail.com",
      numArticleTags: 3,
      tags: [1, 0, 2, 0],
      recommendations: [ ]
    }, {
      id: 2,
      name: "ethan",
      email: "ethan@gmail.com",
      numArticleTags: 2,
      tags: [0, 0, 0, 2],
      recommendations: [ ]
    }
  ],
  article: [
    {
      title: "beer malting",
      content: "did you know, the mayans used to soak the corn, chew it, then spit it out in the malting process, in order to get bacteria",
      tags: [0, 1, 0, 0]
    }, {
      title: "wine-tomato pairing",
      content: "needs an acidic flavor",
      tags: [1, 0, 0, 0]
    }, {
      title: "blue cheese",
      content: "the strong taste tends to be well balanced with something a little sweet. preferably candied savory",
      tags: [0, 0, 1, 0]
    }, {
      title: "honey glazed bacon",
      content: "candied, good as a savory topping on dessert",
      tags: [0, 0, 0, 1]
    }, {
      title: "Earl's beer and cheese",
      content: "review",
      tags: [0, 1, 1, 0]
    }, {
      title: "merlot",
      content: "slurp",
      tags: [1, 0, 0, 0]
    }, {
      title: "best wine with seafood",
      content: "nothing too fishy - strong wines make it fishier",
      tags: [1, 0, 0, 0]
    }, {
      title: "saison",
      content: "pre-industrialized beer, before introduction of hops",
      tags: [0, 1, 0, 0]
    }, {
      title: "saison",
      content: "before hops",
      tags: [0, 1, 0, 0]
    }, {
      title: "history of manchego",
      content: "unpasteurised sheep cheese, born in the home of Don Quixote - La Mancha, Spain",
      tags: [0, 0, 1, 0]
    }, {
      title: "cheesecake",
      content: "history of cheesecake....",
      tags: [0, 0, 1, 0]
    }, {
      title: "proscuitto bruscetta",
      content: "noms",
      tags: [0, 0, 0, 1]
    }, {
      title: "bacon",
      content: "noms",
      tags: [0, 0, 0, 1]
    }, {
      title: "Cheese better with beer or wine?",
      content: "beer better than wine, hands down.",
      tags: [1, 1, 1, 0]
    }, {
      title: "wine and meats",
      content: "not as good of an idea as one might think...",
      tags: [1, 0, 0, 1]
    }, {
      title: "the wine-charcuterie landmine",
      content: "alcohol tends to accentuate salt...",
      tags: [1, 0, 0, 1]
    }, {
      title: "jamon and cava",
      content: "mmmm",
      tags: [1, 0, 0, 1]
    }, {
      title: "Beer and Meats: tale of best friends",
      content: "hello there. did you come to read about food? well, i'm off to eat cause i got too hangry writing this post",
      tags: [0, 1, 0, 1]
    }, {
      title: "Marinate meat in Beer",
      content: "a nice rausch beer would be great",
      tags: [0, 1, 0, 1]
    }, {
      title: "Hop and Salt",
      content: "hoppy beers and salty meats are amazing",
      tags: [0, 1, 0, 1]
    }, {
      title: "a wine for cheesecake",
      content: "riesling",
      tags: [1, 0, 1, 0]
    }, {
      title: "cheese fondue recipe",
      content: "use wine inside cheese fondue",
      tags: [1, 0, 1, 0]
    }, {
      title: "wines for rich aged cheeses",
      content: "manchego-syrah",
      tags: [1, 0, 1, 0]
    }, {
      title: "panchetta, mac & cheese",
      content: "nom",
      tags: [0, 0, 1, 1]
    }, {
      title: "meat and cheese plate",
      content: "NOM",
      tags: [0, 0, 1, 1]
    }, {
      title: "History of the meat and cheese plate",
      content: "NOMNOMNOMNOMNOMNOMNOM",
      tags: [0, 0, 1, 1]
    }, {
      title: "Taste: beer vs wine",
      content: "wine has a storied tradition, but as beer brewing has evolved...",
      tags: [1, 1, 0, 0]
    }, {
      title: "beer and cheese guide",
      content: "lol you thought this was a real article",
      tags: [0, 1, 1, 0]
    }
  ],
  hash: [
    {
      id: 1,
      tag: 'wine'
    }, {
      id: 2,
      tag: 'beer'
    }, {
      id: 3,
      tag: 'cheese'
    }, {
      id: 4,
      tag: 'charcuterie'
    }
  ]
};

db.sync({force: true})
.then(function(){
  console.log('Dropped old data, now inserting data');
  return Promise.map(Object.keys(data), function(name){
    return Promise.map(data[name], function(item){
      return db.model(name)
      .create(item);
    });
  });
})
.then(function(){
  console.log('inserted data');
})
.catch(function(err){
  console.error('there was a problem', err, err.stack);
})
.finally(function(){
  db.close();
  console.log('connection closed');
  return null;
});
