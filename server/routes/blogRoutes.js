const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Fetch comments for a specific blog post
router.get('/comments/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add a new comment
router.post('/comments', async (req, res) => {
  try {
    const { postId, author, message, replyTo } = req.body;
    const newComment = new Comment({ postId, author, message, replyTo });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

module.exports = router;
