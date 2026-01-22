// Debug database configuration
require("dotenv").config();
const dbConfig = require("./src/config/database");

console.log("Database Configuration:");
console.log("Host:", process.env.DB_HOST || "localhost");
console.log("Port:", process.env.DB_PORT || 3306);
console.log("User:", process.env.DB_USER || "root");
console.log("Database:", process.env.DB_NAME || "fitsphere_db");
console.log("Full Config Object:", dbConfig);

// Test the actual connection
const mysql = require("mysql2");
console.log("\nTesting connection pool creation...");
try {
  const pool = mysql.createPool(dbConfig);
  console.log("Pool created successfully");
  console.log("Pool config:", pool.config);
} catch (error) {
  console.error("Pool creation failed:", error.message);
}
