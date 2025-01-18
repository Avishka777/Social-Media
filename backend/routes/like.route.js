const express = require("express");
const { toggleLike } = require("../controllers/like.controller");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

// Toggle like on a post
router.post("/:postId/like", authenticateJWT, toggleLike);

module.exports = router;
