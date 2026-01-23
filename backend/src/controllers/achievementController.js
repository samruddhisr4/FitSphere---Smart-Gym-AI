// Achievements Controller
const { promisePool } = require("../database/connection");

// Get user achievements
const getUserAchievements = async (req, res) => {
  try {
    const userId = req.userId; // From authentication middleware

    // Get user achievements
    const query = `
      SELECT * FROM achievements 
      WHERE user_id = ? 
      ORDER BY earned_date DESC
    `;
    const [achievements] = await promisePool.execute(query, [userId]);

    res.status(200).json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    console.error("Get user achievements error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during achievements retrieval",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Add achievement (typically called internally by other services)
const addAchievement = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId; // From authentication middleware

    // Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    // Check if achievement already exists for this user
    const checkQuery = `
      SELECT * FROM achievements 
      WHERE user_id = ? AND name = ?
    `;
    const [existing] = await promisePool.execute(checkQuery, [userId, name]);

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Achievement already earned",
      });
    }

    // Insert new achievement
    const insertQuery = `
      INSERT INTO achievements (user_id, name, description, earned_date)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await promisePool.execute(insertQuery, [
      userId,
      name,
      description,
      new Date().toISOString().split("T")[0], // Today's date
    ]);

    res.status(200).json({
      success: true,
      message: "Achievement earned successfully",
      data: {
        id: result.insertId,
        userId,
        name,
        description,
        earnedDate: new Date().toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Add achievement error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during achievement addition",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getUserAchievements,
  addAchievement,
};
