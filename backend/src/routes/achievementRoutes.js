// Achievement routes
const express = require("express");
const router = express.Router();
const {
  getUserAchievements,
  addAchievement,
} = require("../controllers/achievementController");
const authenticateToken = require("../middleware/authMiddleware");

// Get user achievements (requires authentication)
router.get("/", authenticateToken, getUserAchievements);

// Add achievement (requires authentication)
router.post("/", authenticateToken, addAchievement);

module.exports = router;
