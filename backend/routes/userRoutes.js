const express = require("express");
const { body } = require("express-validator");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// Validation and route for registration
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
  registerUser
);

module.exports = router;
