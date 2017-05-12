const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  emoticons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emoticon'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
