// Progress Controller
const { promisePool } = require("../database/connection");

// Get user progress
const getUserProgress = async (req, res) => {
  try {
    const userId = req.userId; // From authentication middleware

    // Get progress metrics
    const progressQuery = `
      SELECT * FROM progress_metrics 
      WHERE user_id = ? 
      ORDER BY date_recorded DESC 
      LIMIT 10
    `;
    const [progressMetrics] = await promisePool.execute(progressQuery, [
      userId,
    ]);

    // Get workout sessions
    const sessionsQuery = `
      SELECT * FROM workout_sessions 
      WHERE user_id = ? 
      ORDER BY date_completed DESC 
      LIMIT 10
    `;
    const [workoutSessions] = await promisePool.execute(sessionsQuery, [
      userId,
    ]);

    // Get exercise sets
    const setsQuery = `
      SELECT es.*, e.name as exercise_name, w.name as workout_name
      FROM exercise_sets es
      JOIN workouts w ON es.session_id = w.id
      JOIN exercises e ON es.exercise_id = e.id
      WHERE es.session_id IN (
        SELECT id FROM workout_sessions WHERE user_id = ?
      )
      ORDER BY es.created_at DESC 
      LIMIT 20
    `;
    const [exerciseSets] = await promisePool.execute(setsQuery, [userId]);

    res.status(200).json({
      success: true,
      data: {
        progressMetrics,
        workoutSessions,
        exerciseSets,
        summary: {
          totalWorkouts: workoutSessions.length,
          recentWeight:
            progressMetrics.length > 0 ? progressMetrics[0].weight_kg : null,
          lastUpdated:
            progressMetrics.length > 0
              ? progressMetrics[0].date_recorded
              : null,
        },
      },
    });
  } catch (error) {
    console.error("Get user progress error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during progress retrieval",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Add/update progress metric
const addProgressMetric = async (req, res) => {
  try {
    const { dateRecorded, weightKg, bodyFatPercentage, muscleMassKg, notes } =
      req.body;
    const userId = req.userId; // From authentication middleware

    // Validation
    if (!dateRecorded) {
      return res.status(400).json({
        success: false,
        message: "Date recorded is required",
      });
    }

    // Insert or update progress metric
    const query = `
      INSERT INTO progress_metrics (user_id, date_recorded, weight_kg, body_fat_percentage, muscle_mass_kg, notes)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      weight_kg = VALUES(weight_kg),
      body_fat_percentage = VALUES(body_fat_percentage),
      muscle_mass_kg = VALUES(muscle_mass_kg),
      notes = VALUES(notes)
    `;
    const [result] = await promisePool.execute(query, [
      userId,
      dateRecorded,
      weightKg || null,
      bodyFatPercentage || null,
      muscleMassKg || null,
      notes || null,
    ]);

    res.status(200).json({
      success: true,
      message: "Progress metric added successfully",
      data: {
        id: result.insertId,
        userId,
        dateRecorded,
        weightKg,
        bodyFatPercentage,
        muscleMassKg,
        notes,
      },
    });
  } catch (error) {
    console.error("Add progress metric error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during progress metric addition",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getUserProgress,
  addProgressMetric,
};
