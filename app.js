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

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

const emoticonSchema = new mongoose.Schema({
  content: String,
  category: String
});

const Emoticon = mongoose.model('Emoticon', emoticonSchema);

// '/'
app.get('/', function(req, res, next) {
  res.redirect('/collection');
});

// '/collection'
app.get('/collection', function(req, res, next) {
  Emoticon.find({}, function(err, emoticons) {
    if (err) {
      console.log('Error');
    } else {
      res.render('index', {emoticons});
    }
  });
});

// '/add'
app.post('/add', function(req, res, next) {
  collection.push();
});

// '/delete'
app.delete('/collection/:id', function(req, res, next) {

});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
