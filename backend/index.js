// server.js (atau file backend Anda)

const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt"); // Jika Anda menggunakan bcrypt untuk hashing password
const app = express();
app.use(express.json());

const MYSQL_URL = process.env.MYSQL_URL;

async function connectToDatabase() {
  return await mysql.createConnection(MYSQL_URL);
}

app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const connection = await connectToDatabase();

    // Mengambil pengguna dari database
    const [rows] = await connection.execute("SELECT * FROM Users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const user = rows[0];

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password); // Pastikan password di-hash di database

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Jika berhasil, kirim respons sukses
    res.status(200).json({ message: "Sign in successful", userId: user.id });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
