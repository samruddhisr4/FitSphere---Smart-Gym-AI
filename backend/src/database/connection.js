// Database connection setup
const mysql = require('mysql2');
const dbConfig = require('../config/database');

console.log('Database config being used:', dbConfig);

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Get promise-based connection
const promisePool = pool.promise();

// Test database connection
const connectToDatabase = async () => {
  try {
    console.log('Attempting to get connection from pool...');
    const connection = await promisePool.getConnection();
    console.log('Connection obtained successfully');
    console.log('Connected to MySQL database successfully!');
    connection.release();
    return promisePool;
  } catch (error) {
    console.error('Error connecting to MySQL database:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error errno:', error.errno);
    console.error('Error syscall:', error.syscall);
    console.error('Full error:', error);
    throw error;
  }
};

module.exports = {
  pool,
  promisePool,
  connectToDatabase,
};
