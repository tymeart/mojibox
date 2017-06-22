const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('splash');
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
      res.redirect('/');
    });
  });
});

// log in
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local',
  {
    failureRedirect: '/login'
  }), (req, res) => {
    res.locals.currentUser = req.user;
    res.redirect(`/user/${req.user.username}/collection`);
  }
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
