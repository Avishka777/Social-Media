const express = require("express");
const { body } = require("express-validator");
const {
  addComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

// Add a comment
router.post(
  "/:postId/comments",
  authenticateJWT,
  body("content").notEmpty().withMessage("Content is required"),
  addComment
);

// Get all comments for a specific post
router.get("/:postId", authenticateJWT, getCommentsByPost);

// Update a comment
router.put(
  "/:commentId",
  authenticateJWT,
  body("content").notEmpty().withMessage("Content cannot be empty"),
  updateComment
);

// Delete a comment
router.delete("/:commentId", authenticateJWT, deleteComment);

module.exports = router;
