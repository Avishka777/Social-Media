const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");

// Create a new post
exports.createPost = async (req, res) => {
  const { title, location } = req.body;
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }

  try {
    const post = await Post.create({
      title,
      imageUrl: req.file.path, // Path of uploaded image
      location,
      userId,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post", details: error.message });
  }
};

// Comment on a post
exports.addComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.create({
      content,
      userId,
      postId,
    });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

// Like or Unlike a post
exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      await existingLike.destroy();
      return res.status(200).json({ message: "Post unliked" });
    }

    await Like.create({ userId, postId });
    res.status(201).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle like", details: error.message });
  }
};
