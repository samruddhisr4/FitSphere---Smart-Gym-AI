const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_PORT =", process.env.DB_PORT);
console.log("DB_USER =", process.env.DB_USER);

// Express server setup
const express = require("express");
const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

const { connectToDatabase } = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require("./routes/authRoutes");

// Routes
app.use("/api/auth", authRoutes);

// Health check endpoint

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "FitSphere backend server is running",
    timestamp: new Date().toISOString(),
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Promise Rejection: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Server startup
const startServer = async () => {
  try {
    // Connect to database
    console.log("Attempting to connect to MySQL database...");
    await connectToDatabase();

    // Start the server
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`\n=======================================`);
      console.log(`FitSphere Backend Server Started`);
      console.log(`=======================================`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Database: MySQL connected successfully`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log(`=======================================\n`);
    });

    // Handle server errors
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
