const express = require('express'),
      router = express.Router(),
      db = require('../models');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:id', function(req, res, next) {
  db.User.findById(req.params.id).then(function(user) {
    res.render('users/show', {user}),
    function(err) {
      res.send('Error!');
    });
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.get('/:id/edit', function(req, res, next) {
  db.User.findById(req.params.id).then(function(user) {
    res.render('users/edit', {user}),
    function(err) {
      res.send('Error!');
    });
});

router.post('/', function(req, res, next) {
  db.User.create(req.body).then(function() {
    res.redirect('/');
  });
});

router.patch('/:id', function(req, res, next) {
  db.User.findByIdAndUpdate(req.params.id, req.body.newUsername).then(function() {
    res.redirect('/:id');
  });
});

router.delete('/:id', function(req, res, next) {
  db.User.findByIdAndRemove(req.params.id).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
