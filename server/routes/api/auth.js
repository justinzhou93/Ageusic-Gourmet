var router = require('express').Router();
const axios = require('axios');
const passport = require('passport');

const db = require('../../db');
const User = db.user;

console.log('im in');
router.post('/login', (req, res, next) => {
  console.log('GOT TO LOGIN ROUTE');
  console.log('REQ BODY:', req.body);
  User.findOne({
    where: req.body
  })
  .then( (foundUser) => {
    //persist their session
    console.log(foundUser);
    if (foundUser) {
      req.session.userId = foundUser.id;
      // res.redirect(`/users/${foundUser.id}`);
      res.status(200).send(foundUser);
    } else {
      res.sendStatus(401);
    }
    console.log('SESSION: ', req.session);
  })
  .catch(next);
});

router.get('/logout', (req, res, next) => {
  req.session.userId = null;
  res.redirect('/');
});

router.get('/auth/me', (req, res, next) => {
  let userId = req.session.userId;
  console.log('FOUND USERID', userId);
  if (userId){
    //findOne in db
    User.findById(userId)
    .then( (user) => {
      console.log('FOUND USER ON LOAD:', user);
      res.status(200).send(user);
    })
    .catch(next);
  } else {
    res.send(null);
  }
});

// //Strategy
// // don't forget to install passport-google-oauth
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// passport.use(
//   new GoogleStrategy({
//     clientID: '748871621912-dkp2q4n65qtnnojki2p0mpr5g9fg05de.apps.googleusercontent.com',
//     clientSecret: '6eIzBZt2GlGnjHqNzyv2jz6s',
//     callbackURL: 'http://127.0.0.1:8080/auth/google/callback',
//     realm: 'http://127.0.0.1:8080'
//   },
//   // Google will send back the token and profile
//   function (token, refreshToken, profile, done) {
//     // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
//     console.log('---', 'in verification callback', profile, '---');
//     done();
//
//   })
// );
//
// // Google authentication and login
// router.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

//Handle the callback after Google has authenticated
// router.get('/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   })
// );


module.exports = router;
