const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mojibox');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const userRoutes = require('./routes/users');
const emoticonRoutes = require('./routes/emoticons');

app.use('/user', userRoutes);
app.use('/user/:user_id/', emoticonRoutes);

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
