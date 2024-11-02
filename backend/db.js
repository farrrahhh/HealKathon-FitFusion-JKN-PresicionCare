// db.js
const mysql = require("mysql2/promise");

// Mengambil URL dari variabel lingkungan atau menggunakan nilai default
const MYSQL_URL = process.env.MYSQL_URL || "mysql://root:ononaixqAJRZzgPYMajKPNiThASOzssO@autorack.proxy.rlwy.net:29792/railway";

// Fungsi untuk membuat koneksi ke database
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(MYSQL_URL);
    console.log("Connected to MySQL database.");
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
}

// Ekspor fungsi untuk digunakan di file lain
module.exports = connectToDatabase;
