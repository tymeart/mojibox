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

router.post('/delete', isLoggedIn, function(req, res, next) {
  var removeArr = req.body.selectedArr;
  var user = req.user;

  Promise.all(
    removeArr.map(id => {
      return Emoticon.findOneAndRemove({_id: id});
    }))
    .then(results => {
      removeArr.forEach(id => {
        var index = user.emoticons.indexOf(id);
        if (index > -1) {
          user.emoticons.splice(index, 1);
        }
      });
    })
    .catch(err => { console.log(err)});
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
