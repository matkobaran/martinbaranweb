const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
});

module.exports = mongoose.model('Comment', commentSchema);
