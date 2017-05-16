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

router.get('/collection', function(req, res, next) {
  Emoticon.find({}, function(err, emoticons) {
    if (err) {
      console.log('Error');
    } else {
      res.render('index', {emoticons});
    }
  });
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
