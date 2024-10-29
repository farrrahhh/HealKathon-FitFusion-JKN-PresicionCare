// index.js
require("dotenv").config();
const mysql = require("mysql2/promise");

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(process.env.MYSQL_URL);

    console.log("Connected to database as ID " + connection.threadId);

    const [rows, fields] = await connection.execute("SELECT * FROM your_table_name"); // Ganti dengan nama tabel yang sesuai
    console.log(rows);

    await connection.end();
  } catch (err) {
    console.error("Database connection failed: ", err);
  }
}

connectToDatabase();
