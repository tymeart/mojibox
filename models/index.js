const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/mojibox');
mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Emoticon = require('./emoticon');
