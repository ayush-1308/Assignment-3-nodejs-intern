const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.connect('mongodb://localhost:27017/social_network');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  username: String,
  name: String,
  bio: String,
  password: String,
  follows: [{ type: String, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);