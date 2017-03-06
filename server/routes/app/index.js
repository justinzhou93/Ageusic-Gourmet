'use strict';
var express = require('express');
var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));


// cookie: {
//   maxAge: 2
// }
//Session Handling middleware
app.use(session({

  secret: 'string',
  resave: false,
  saveUnitialized: false
}));

// place right after the session setup middleware
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

//Counts api calls from a single user
app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

// //Initialize Passport after Sessions so that info is available
// app.use(passport.initialize());
// app.use(passport.session());


// "Responding" middleware (may send a response back to client)
app.use('/api', require('../api'));

app.use('/', require('../api/auth'));

// THIS IS WHERE I SEND THE REACT PAGE
var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));

module.exports = app;
