const express = require("express");
const { body } = require("express-validator");
const { registerUser, updateUser, deleteUser, getUserDetails } = require("../controllers/userController");

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

router.put(
  "/:id",
  [
    body("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("lastName")
      .optional()
      .notEmpty()
      .withMessage("Last name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("birthday")
      .optional()
      .notEmpty()
      .withMessage("Birthday cannot be empty"),
  ],
  updateUser
);

router.delete("/:id", deleteUser);

router.get("/:id", getUserDetails);


module.exports = router;
