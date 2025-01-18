const Comment = require("../models/comment.model");

// Add a comment
exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({
      postId,
      userId: req.user.id,
      content,
    });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

// View all comments for a specific post
exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({ where: { postId } });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments", details: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to update this comment" });
    }

    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment", details: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this comment" });
    }

    await comment.destroy();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment", details: error.message });
  }
};
