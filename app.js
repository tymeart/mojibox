const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user');

mongoose.Promise = require('bluebird');
const dburl = process.env.DATABASE_URL || 'mongodb://localhost/mojibox';
mongoose.connect(dburl);

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'what is this for',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const userRoutes = require('./routes/users'),
      emoticonRoutes = require('./routes/emoticons'),
      indexRoutes = require('./routes/index');

app.use('/', indexRoutes);
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

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
