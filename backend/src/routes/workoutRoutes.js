// Workout routes
const express = require("express");
const router = express.Router();
const {
  generateWorkoutPlan,
  getCurrentPlan,
} = require("../controllers/workoutController");
const authenticateToken = require("../middleware/authMiddleware");

// Generate new workout plan (requires authentication)
router.post("/generate", authenticateToken, generateWorkoutPlan);

// Get current workout plan (requires authentication)
router.get("/current", authenticateToken, getCurrentPlan);

module.exports = router;
