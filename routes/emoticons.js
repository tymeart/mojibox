const express = require('express'),
      router = express.Router({mergeParams: true}),
      User = require('../models/user');
      Emoticon = require('../models/emoticon');

router.get('/', function(req, res, next) {
  User.findOne({username: req.params.username}).populate('emoticons').exec(function(err, user) {
    if (err) console.log(err);
    res.render('emoticons/index', {user, emoticons: user.emoticons});
  });
});

router.get('/new', function(req, res, next) {
  res.render('emoticons/new', {user: req.params.username});
});

router.post('/new', function(req, res, next) {
  User.findOne({username: req.params.username}).then(function(user) {
    Emoticon.create({content: req.body.content, category: req.body.category, user: user._id}).then(function(newEmoticon) {
      user.emoticons.push(newEmoticon);
      user.markModified('emoticons');
      user.save(function(err) {
        if (err) console.log(err);
        console.log('Saved!');
      });
      res.redirect(`/user/${user.username}/collection`);
    }).catch(function(err) {
      console.log(err);
    });
  });
});

router.delete('/:id', function(req, res, next) {

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('user/login');
}

module.exports = router;
