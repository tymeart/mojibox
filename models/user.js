const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  emoticons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emoticon'
  }]
});

const User = mongoose.model('User', userSchema);

userSchema.plugin(passportLocalMongoose);

module.exports = User;
