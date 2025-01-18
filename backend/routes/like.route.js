const express = require("express");
const likeController = require("../controllers/like.controller");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

// Toggle like on a post ----------------------------------------------------------
router.post("/:postId", authenticateJWT, likeController.toggleLike);

module.exports = router;
