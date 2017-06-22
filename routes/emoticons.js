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

router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('emoticons/new', {user: req.user});
});

router.post('/new', isLoggedIn, function(req, res, next) {
  User.findOne({username: req.user.username}).then(function(user) {
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

router.delete('/delete', isLoggedIn, function(req, res, next) {
  console.log(req.body.selected);
  // remove from emoticons collection
  // Emoticons.remove({content: {$in: selected}});
  // splice out of user emoticons array
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
