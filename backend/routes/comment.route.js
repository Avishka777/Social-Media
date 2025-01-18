const express = require("express");
const { body } = require("express-validator");
const commentController = require("../controllers/comment.controller");
const authenticateJWT = require("../middleware/authMiddleware");
const router = express.Router();

// Add a comment ------------------------------------------------------------------
router.post("/:postId", authenticateJWT, commentController.addComment);

// Get all comments for a specific post -------------------------------------------
router.get("/:postId", authenticateJWT, commentController.getCommentsByPost);

// Update a comment ---------------------------------------------------------------
router.put("/:commentId", authenticateJWT, commentController.updateComment);

// Delete a comment ---------------------------------------------------------------
router.delete("/:commentId", authenticateJWT, commentController.deleteComment);

module.exports = router;
