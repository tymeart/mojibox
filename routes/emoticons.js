const express = require('express'),
      router = express.Router({mergeParams: true}),
      db = require('../models');

router.get('/', function(req, res, next) {
  db.Emoticon.find({}).then(function(emoticons) {
      res.render('emoticons/index', {emoticons});
  }).catch(function(err) {
      console.log(err);
  });
});

router.get('/new', function(req, res, next) {
  res.render('emoticons/new', {user: req.params.username});
});

router.post('/collection/add', function(req, res, next) {
  Emoticon.create(req.body.emoticon, function(err, newEmoticon) {
    if (err) {
      res.render('error');
    } else {
      res.redirect('/collection');
    }
  });
});

router.delete('/collection/:id', function(req, res, next) {

});

module.exports = router;
