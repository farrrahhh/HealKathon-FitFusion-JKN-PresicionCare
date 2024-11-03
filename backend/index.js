const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

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

    // Check if username already exists
    console.log("Checking for existing user with username:", username);
    const [existingUser] = await connection.execute("SELECT * FROM Users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      console.log("Username already exists:", username);
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const [result] = await connection.execute("INSERT INTO Users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    const userId = result.insertId; // Get the inserted user ID
    console.log("User created successfully:", username);

    res.status(201).json({ message: "User created successfully.", userId }); // Include userId in the response
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (connection) {
      await connection.end(); // Ensure the connection is closed
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

// Rute untuk menyimpan data kesehatan
app.post("/api/health-data", async (req, res) => {
  const {
    userId,
    name,
    jknNumber,
    age,
    gender,
    medicalHistory,
    isUnderMedication,
    medicationDetails,
    familyHistory,
    hasAllergy,
    allergyDetails,
    exerciseFrequency,
    smokingStatus,
    alcoholConsumption,
    dietDetails,
    dietDescription,
    weight,
    height,
    bloodPressure,
    bloodSugar,
    cholesterol,
    hepatitisBVaccine,
    influenzaVaccine,
    mentalHealthHistory,
    mentalHealthDescription,
    geneticData,
    geneticDescription,
  } = req.body;

  let connection;
  try {
    connection = await connectToDatabase();
    await connection.beginTransaction(); // Start transaction

    // Check for duplicate jkn_number
    const [existingJkn] = await connection.execute("SELECT * FROM Personal_Informations WHERE jkn_number = ?", [jknNumber]);
    if (existingJkn.length > 0) {
      await connection.rollback(); // Rollback transaction
      return res.status(409).json({ message: "JKN number already exists." });
    }

    // Insert into Personal_Informations
    await connection.execute(`INSERT INTO Personal_Informations (id_user, name, jkn_number, age, gender) VALUES (?, ?, ?, ?, ?)`, [userId, name, jknNumber, age, gender]);

    // Insert into Medical_History
    await connection.execute(`INSERT INTO Medical_History (id_user, hypertension, diabetes, high_cholesterol, heart_disease, asthma, kidney_disease, on_medication, medication_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      userId,
      medicalHistory.hypertension,
      medicalHistory.diabetes,
      medicalHistory.cholesterol,
      medicalHistory.heartDisease,
      medicalHistory.asthma,
      medicalHistory.kidneyDisease,
      isUnderMedication,
      medicationDetails,
    ]);

    // Insert into Lifestyle_Activity
    await connection.execute(`INSERT INTO Lifestyle_Activity (id_user, exercise_frequency, smoking_status, alcohol_consumption, has_diet, diet_details) VALUES (?, ?, ?, ?, ?, ?)`, [
      userId,
      exerciseFrequency,
      smokingStatus,
      alcoholConsumption,
      dietDetails,
      dietDescription,
    ]);

    // Insert into Allergies
    await connection.execute(`INSERT INTO Allergies (id_user, has_allergy, allergy_details) VALUES (?, ?, ?)`, [userId, hasAllergy, allergyDetails]);

    // Insert into Vaccination_Status
    await connection.execute(`INSERT INTO Vaccination_Status (id_user, hepatitis, influenza) VALUES (?, ?, ?)`, [userId, hepatitisBVaccine ? "Yes" : "No", influenzaVaccine ? "Yes" : "No"]);

    // Insert into Mental_Health_History
    await connection.execute(`INSERT INTO Mental_Health_History (id_user, has_mental_health_condition, condition_details) VALUES (?, ?, ?)`, [userId, mentalHealthHistory, mentalHealthDescription]);

    // Insert into Genetic_Data
    await connection.execute(`INSERT INTO Genetic_Data (id_user, has_genetic_data, genetic_data_details) VALUES (?, ?, ?)`, [userId, geneticData, geneticDescription]);

    // Insert into Health_Measurements
    await connection.execute(`INSERT INTO Health_Measurements (id_user, weight, height, blood_pressure, blood_sugar, cholesterol) VALUES (?, ?, ?, ?, ?, ?)`, [userId, weight, height, bloodPressure, bloodSugar, cholesterol]);

    // Insert into Family_History
    await connection.execute(`INSERT INTO Family_History (user_id, hypertension, diabetes, heart_disease, cancer) VALUES (?, ?, ?, ?, ?)`, [
      userId,
      familyHistory.hypertension,
      familyHistory.diabetes,
      familyHistory.heartDisease,
      familyHistory.cancer,
    ]);

    await connection.commit(); // Commit transaction

    console.log("Health data saved successfully for user:", userId);
    res.status(201).json({ message: "Health data saved successfully." });
  } catch (error) {
    if (connection) {
      await connection.rollback(); // Rollback transaction on error
    }
    console.error("Error saving health data:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
