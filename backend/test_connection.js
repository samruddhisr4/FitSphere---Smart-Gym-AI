// Test MySQL connection
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MySQL connection...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Ramo@1602',
      database: process.env.DB_NAME || 'fitsphere_db'
    });
    
    console.log('Successfully connected to MySQL!');
    
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log('Query result:', rows[0].solution);
    
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testConnection();