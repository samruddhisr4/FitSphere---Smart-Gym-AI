// Progress routes
const express = require("express");
const router = express.Router();
const {
  getUserProgress,
  addProgressMetric,
} = require("../controllers/progressController");
const authenticateToken = require("../middleware/authMiddleware");

// Get user progress (requires authentication)
router.get("/", authenticateToken, getUserProgress);

// Add progress metric (requires authentication)
router.post("/metric", authenticateToken, addProgressMetric);

module.exports = router;
