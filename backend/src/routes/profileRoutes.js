// Profile routes
const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getUserProfile,
} = require("../controllers/profileController");
const authenticateToken = require("../middleware/authMiddleware");

// Update user profile (requires authentication)
router.put("/update", authenticateToken, updateProfile);

// Get user profile (requires authentication)
router.get("/me", authenticateToken, getUserProfile);

module.exports = router;
