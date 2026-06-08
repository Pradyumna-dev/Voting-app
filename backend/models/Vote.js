const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  candidate: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Vote', voteSchema);