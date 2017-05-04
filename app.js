const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

var collection = [];
var id = 1;

// '/'
app.get('/', function(req, res, next) {
  res.render('index');
  // res.redirect('/collection');
});

// '/collection'
app.get('/collection', function(req, res, next) {
  res.render('show', {collection});
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
