const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

app.get('/', function(req, res, next) {
  res.redirect('/user');
});

// AUTH ROUTES
// sign up
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/', function(req, res, next) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('users/new');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/user/');
    });
  });
});

// log in
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })
);

// log out
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/login');
}

module.exports = router;
