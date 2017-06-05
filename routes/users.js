const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.get('/:username', function(req, res, next) {
  db.User.findOne({username: req.params.username}).then(function(user) {
    res.render('users/show', {user});
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/:username/edit', function(req, res, next) {
  db.User.findOne({username: req.params.username}).then(function(user) {
    res.render('users/edit', {user});
  }).catch(function(err) {
    console.log(err);
  });
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

// find not by ID and update
router.patch('/:username', function(req, res, next) {
  db.User.findOneAndUpdate({username: req.params.username}, {username: req.body.newUsername}).then(function(user) {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

// find and then remove
router.delete('/:username', function(req, res, next) {
  db.User.findOneAndRemove({username: req.params.username}).then(function() {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
