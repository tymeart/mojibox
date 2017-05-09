const mongoose = require('mongoose');

const emoticonSchema = new mongoose.Schema({
  content: String,
  category: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Emoticon = mongoose.model('Emoticon', emoticonSchema);

module.exports = Emoticon;
