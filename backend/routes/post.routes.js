const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const { body } = require("express-validator");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  authenticateJWT,
  upload.single("image"),
  postController.createPost
);

// Update a post
router.put(
  "/:postId",
  authenticateJWT,
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("location").optional(),
  postController.updatePost
);

// Get a post by ID
router.get("/:postId", authenticateJWT, postController.getPostById);

// Get all posts
router.get("/", authenticateJWT, postController.getAllPosts);

// Delete a post
router.delete("/:postId", authenticateJWT, postController.deletePost);

router.post("/:postId/comment", authenticateJWT, postController.addComment);
router.post("/:postId/like", authenticateJWT, postController.toggleLike);

module.exports = router;
