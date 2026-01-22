// Load environment variables first
require("dotenv").config();

// Define configuration object after loading env vars
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "fitsphere_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

module.exports = dbConfig;
