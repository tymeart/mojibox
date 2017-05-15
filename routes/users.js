const express = require('express'),
      router = express.Router(),
      db = require('../models');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.get('/:username', function(req, res, next) {
  db.User.findOne({username: req.params.username}).then(function(user) {
    res.render('users/show', {user});
  });
});

router.get('/:username/edit', function(req, res, next) {
  db.User.findOne({username: req.params.username}).then(function(user) {
    res.render('users/edit', {user});
  });
});

router.post('/', function(req, res, next) {
  db.User.create(req.body).then(function() {
    res.redirect('/');
  });
});

// find not by ID and update
router.patch('/:username', function(req, res, next) {
  db.User.findOne({username: req.params.username}).then(function(user) {
    user.username = req.body.newUsername;
    res.redirect('/:username');
  });
});

// find and then remove
router.delete('/:username', function(req, res, next) {
  db.User.findOneAndRemove({username: req.params.username}).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
