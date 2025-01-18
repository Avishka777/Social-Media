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


// Update a post
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, location } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to update this post" });
    }

    // Update the post
    post.title = title || post.title;
    post.location = location || post.location;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post", details: error.message });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post", details: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts", details: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this post" });
    }

    // Delete the post
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post", details: error.message });
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
