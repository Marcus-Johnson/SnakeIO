const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  score: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', PlayerSchema);