// Form analysis routes
const express = require("express");
const router = express.Router();
const { submitFormAnalysis } = require("../controllers/formController");
const authenticateToken = require("../middleware/authMiddleware");

// Submit form analysis (requires authentication)
router.post("/", authenticateToken, submitFormAnalysis);

module.exports = router;
