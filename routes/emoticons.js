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

router.post('/new', function(req, res, next) {
  db.User.findOne({username: req.params.username}).then(function(user) {
    db.Emoticon.create({content: req.body.content, category: req.body.category, user: user._id}).then(function(newEmoticon) {
      user.emoticons.push(newEmoticon);
      res.redirect(`/user/${user.username}/collection`);
    }).catch(function(err) {
      console.log(err);
    });
  });
});

router.delete('/collection/:id', function(req, res, next) {

});

module.exports = router;
