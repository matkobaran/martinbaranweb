const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Comment schema and model
const commentSchema = new mongoose.Schema({
  postId: Number,
  author: String,
  message: String,
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
});

const Comment = mongoose.model("Comment", commentSchema);

// **Define route for posting comments**
app.post("/api/comments", async (req, res) => {
  try {
    const { postId, author, message, replyTo } = req.body;

    const newComment = new Comment({ postId, author, message, replyTo });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
