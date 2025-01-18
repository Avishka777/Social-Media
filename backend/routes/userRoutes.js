const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authenticateJWT = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Validation and route for registration  ----------------------------------------
router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("birthday").notEmpty().withMessage("Birthday is required"),
  ],
  userController.registerUser
);

// Validation and route for login ------------------------------------------------
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.loginUser
);

// Route for view user  ----------------------------------------------------------
router.get("/profile", authenticateJWT, userController.getUserProfile);

// Route for update user  --------------------------------------------------------
router.put("/update", authenticateJWT, userController.updateUser);

// Route for delete user  --------------------------------------------------------
router.delete("/delete", authenticateJWT, userController.deleteUser);

module.exports = router;
