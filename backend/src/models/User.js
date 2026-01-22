// User model with database operations
const { promisePool } = require("../database/connection");
const bcrypt = require("bcryptjs");

const User = {
  // Create a new user
  async create(userData) {
    try {
      const { username, email, password } = userData;

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
      const [result] = await promisePool.execute(query, [
        username,
        email,
        hashedPassword,
      ]);

      // Create user profile record
      const profileQuery = `INSERT INTO user_profiles (user_id, first_name, last_name) VALUES (?, ?, ?)`;
      await promisePool.execute(profileQuery, [
        result.insertId,
        userData.firstName || null,
        userData.lastName || null,
      ]);

      return {
        id: result.insertId,
        username,
        email,
        createdAt: new Date(),
      };
    } catch (error) {
      throw error;
    }
  },

  // Find user by email
  async findByEmail(email) {
    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      const [rows] = await promisePool.execute(query, [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },

  // Find user by ID
  async findById(id) {
    try {
      const query = `SELECT id, username, email, created_at FROM users WHERE id = ?`;
      const [rows] = await promisePool.execute(query, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },

  // Validate password
  async validatePassword(inputPassword, hashedPassword) {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userId, profileData) {
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
      } = profileData;

      // Update user_profiles table
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
        firstName,
        lastName,
        age,
        heightCm,
        weightKg,
        fitnessLevel,
        goal,
        trainingDaysPerWeek,
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile
  async getProfile(userId) {
    try {
      const query = `SELECT * FROM user_profiles WHERE user_id = ?`;
      const [rows] = await promisePool.execute(query, [userId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
