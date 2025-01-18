const Like = require("../models/like.model");

// Toggle like on a post -----------------------------------------------------------
exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      // If like exists, remove it (unlike)
      await existingLike.destroy();
      return res.status(200).json({ message: "Post unliked" });
    }

    // If like does not exist, create it
    await Like.create({ userId, postId });
    res.status(201).json({ message: "Post liked" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to toggle like", details: error.message });
  }
};
