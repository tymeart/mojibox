const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user');

mongoose.connect('mongodb://localhost/mojibox');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Spike is so cute',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const userRoutes = require('./routes/users');
const emoticonRoutes = require('./routes/emoticons');

app.use('/user', userRoutes);
app.use('/user/:username/collection', emoticonRoutes);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.get('/', function(req, res, next) {
  res.redirect('/user');
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
