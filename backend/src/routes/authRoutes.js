// Authentication routes
const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get user profile (protected route)
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
