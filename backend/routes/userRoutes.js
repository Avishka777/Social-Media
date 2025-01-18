const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authenticateJWT = require("../middleware/authMiddleware");
const userController = require("../controllers/user.controller");

// Route for registration  --------------------------------------------------------
router.post("/register", userController.registerUser);

// Route for login ----------------------------------------------------------------
router.post("/login", userController.loginUser);

// Route for view user ------------------------------------------------------------
router.get("/profile", authenticateJWT, userController.getUserProfile);

// Route for update user ----------------------------------------------------------
router.put("/update", authenticateJWT, userController.updateUser);

// Route for delete user ----------------------------------------------------------
router.delete("/delete", authenticateJWT, userController.deleteUser);

module.exports = router;
