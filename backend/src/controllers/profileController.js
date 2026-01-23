// Profile Controller
const { promisePool } = require("../database/connection");

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      heightCm,
      weightKg,
      fitnessLevel,
      goal,
      trainingDaysPerWeek,
    } = req.body;

    const userId = req.userId; // From authentication middleware

    // Update user profile
    const query = `
      INSERT INTO user_profiles (user_id, first_name, last_name, age, height_cm, weight_kg, fitness_level, goal, training_days_per_week)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      first_name = VALUES(first_name),
      last_name = VALUES(last_name),
      age = VALUES(age),
      height_cm = VALUES(height_cm),
      weight_kg = VALUES(weight_kg),
      fitness_level = VALUES(fitness_level),
      goal = VALUES(goal),
      training_days_per_week = VALUES(training_days_per_week)
    `;

    const [result] = await promisePool.execute(query, [
      userId,
      firstName || null,
      lastName || null,
      age || null,
      heightCm || null,
      weightKg || null,
      fitnessLevel || null,
      goal || null,
      trainingDaysPerWeek || null,
    ]);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        userId,
        firstName,
        lastName,
        age,
        heightCm,
        weightKg,
        fitnessLevel,
        goal,
        trainingDaysPerWeek,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during profile update",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get user profile (this extends the existing getProfile in authController)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    // Get user info from users table
    const userQuery = `SELECT id, username, email, created_at FROM users WHERE id = ?`;
    const [users] = await promisePool.execute(userQuery, [userId]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    // Get profile info from user_profiles table
    const profileQuery = `SELECT * FROM user_profiles WHERE user_id = ?`;
    const [profiles] = await promisePool.execute(profileQuery, [userId]);

    const profile = profiles.length > 0 ? profiles[0] : null;

    res.status(200).json({
      success: true,
      data: {
        user,
        profile,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during profile retrieval",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  updateProfile,
  getUserProfile,
};
