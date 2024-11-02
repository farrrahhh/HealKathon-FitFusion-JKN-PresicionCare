const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const healthDataRoutes = require("./routes/healthDataRoutes"); // Pastikan rute ini ada
const app = express();

app.use(bodyParser.json()); // Menggunakan bodyParser untuk mengurai JSON

const MYSQL_URL = process.env.MYSQL_URL || "mysql://root:ononaixqAJRZzgPYMajKPNiThASOzssO@autorack.proxy.rlwy.net:29792/railway";

async function connectToDatabase() {
  console.log("Connecting to database...");
  try {
    const connection = await mysql.createConnection(MYSQL_URL);
    console.log("Database connected.");
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Rethrow the error for handling in the route
  }
}

// Rute Sign Up
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  let connection;
  try {
    connection = await connectToDatabase();

    // Cek apakah username sudah ada
    console.log("Checking for existing user with username:", username);
    const [existingUser] = await connection.execute("SELECT * FROM Users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      console.log("Username already exists:", username);
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru
    await connection.execute("INSERT INTO Users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    console.log("User created successfully:", username);

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (connection) {
      await connection.end(); // Pastikan koneksi ditutup
    }
  }
});

// Rute Sign In
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  let connection;
  try {
    connection = await connectToDatabase();

    // Ambil pengguna berdasarkan username
    console.log("Fetching user for username:", username);
    const [rows] = await connection.execute("SELECT * FROM Users WHERE username = ?", [username]);

    if (rows.length === 0) {
      console.log("Invalid username:", username);
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const user = rows[0];

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for username:", username);
      return res.status(401).json({ message: "Invalid username or password." });
    }

    console.log("Sign in successful for user:", username);
    res.status(200).json({ message: "Sign in successful", userId: user.id });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (connection) {
      await connection.end(); // Pastikan koneksi ditutup
    }
  }
});

// Rute Health Data
app.use("/api/health-data", healthDataRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
