const mongoose = require('mongoose'); 

const postSchema = new mongoose.Schema({
  user: { type: String, ref: 'User' },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);