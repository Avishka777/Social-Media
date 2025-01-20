const Post = require("../models/post.model");
const User = require("../models/user.model");
const Like = require("../models/like.model");
const Comment = require("../models/comment.model");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { body, validationResult } = require("express-validator");

// Create a new post  -------------------------------------------------------
exports.createPost = async (req, res) => {
  const { title, location } = req.body;
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }

  try {
    const post = await Post.create({
      title,
      imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
      location,
      userId,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: error.message });
  }
};

// Update a post  -----------------------------------------------------------
exports.updatePost = async (req, res) => {
  await body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .run(req);
  await body("location").optional().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { postId } = req.params;
  const { title, location } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this post" });
    }

    // Update the post
    post.title = title || post.title;
    post.location = location || post.location;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update post", details: error.message });
  }
};

// Get a post by ID ---------------------------------------------------------
exports.getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve post", details: error.message });
  }
};

// Get all posts  -----------------------------------------------------------
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
        {
          model: Comment,
          attributes: ["content"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          model: Like,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("Likes.id")),
            "likeCount", 
          ],
        ],
      },
      group: ["Post.id", "User.id", "Comments.id", "Likes.id"],
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve posts", details: error.message });
  }
};

// Delete a post  -----------------------------------------------------------
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    // Delete the post
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete post", details: error.message });
  }
};
