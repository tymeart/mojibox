const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

// index
router.get('/', function(req, res, next) {
  res.render('users/index');
});

// user show page
router.get('/:username', function(req, res, next) {
  User.findOne({username: req.params.username}).then(function(user) {
    res.render('users/show', {user});
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/:username/edit', isLoggedIn, function(req, res, next) {
  User.findOne({username: req.params.username}).then(function(user) {
    res.render('users/edit', {user});
  }).catch(function(err) {
    console.log(err);
  });
});

router.patch('/:username', isLoggedIn, function(req, res, next) {
  db.User.findOneAndUpdate({username: req.params.username}, {username: req.body.newUsername}).then(function(user) {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

router.delete('/:username', isLoggedIn, function(req, res, next) {
  db.User.findOneAndRemove({username: req.params.username}).then(function() {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/login');
}

module.exports = router;
