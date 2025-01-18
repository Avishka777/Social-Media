const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const { body } = require("express-validator");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Route for create post ----------------------------------------------------------
router.post(
  "/create",
  authenticateJWT,
  upload.single("image"),
  postController.createPost
);

// Route for update a post --------------------------------------------------------
router.put("/:postId", authenticateJWT, postController.updatePost);

// Route for get a post by ID -----------------------------------------------------
router.get("/:postId", authenticateJWT, postController.getPostById);

// Route for get all posts --------------------------------------------------------
router.get("/", authenticateJWT, postController.getAllPosts);

// Route for delete a post --------------------------------------------------------
router.delete("/:postId", authenticateJWT, postController.deletePost);

module.exports = router;
