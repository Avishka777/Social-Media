const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const postController = require("../controllers/post.controller");
const multer = require("multer");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

router.post("/create", authenticateJWT, upload.single("image"), postController.createPost);
router.post("/:postId/comment", authenticateJWT, postController.addComment);
router.post("/:postId/like", authenticateJWT, postController.toggleLike);

module.exports = router;
