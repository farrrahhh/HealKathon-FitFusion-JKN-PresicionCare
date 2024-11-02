const express = require("express");
const connectToDatabase = require("../db");

const router = express.Router();

// Rute untuk mengumpulkan data kesehatan
router.post("/submit-health-data", async (req, res) => {
  const { userId, personalInformation, medicalHistory, lifestyleActivity, geneticData, allergies, vaccinationStatus, mentalHealthHistory, healthMeasurements } = req.body;

  // Validasi ID pengguna
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Validasi data yang diperlukan
  if (!personalInformation || !medicalHistory || !lifestyleActivity || !geneticData || !allergies || !vaccinationStatus || !mentalHealthHistory || !healthMeasurements) {
    return res.status(400).json({ message: "All health data fields are required." });
  }

  let connection;
  try {
    connection = await connectToDatabase();

    // Menyimpan informasi pribadi
    const { name, jkn_number, age, gender } = personalInformation;
    await connection.execute("INSERT INTO Personal_Informations (id_user, name, jkn_number, age, gender) VALUES (?, ?, ?, ?, ?)", [userId, name, jkn_number, age, gender]);

    // Menyimpan riwayat medis
    await connection.execute("INSERT INTO Medical_History (id_user, hypertension, diabetes, high_cholesterol, heart_disease, asthma, kidney_disease, on_medication, medication_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      userId,
      medicalHistory.hypertension,
      medicalHistory.diabetes,
      medicalHistory.high_cholesterol,
      medicalHistory.heart_disease,
      medicalHistory.asthma,
      medicalHistory.kidney_disease,
      medicalHistory.on_medication,
      medicalHistory.medication_details,
    ]);

    // Menyimpan aktivitas gaya hidup
    await connection.execute("INSERT INTO Lifestyle_Activity (id_user, exercise_frequency, smoking_status, alcohol_consumption, has_diet, diet_details) VALUES (?, ?, ?, ?, ?, ?)", [
      userId,
      lifestyleActivity.exercise_frequency,
      lifestyleActivity.smoking_status,
      lifestyleActivity.alcohol_consumption,
      lifestyleActivity.has_diet,
      lifestyleActivity.diet_details,
    ]);

    // Menyimpan data genetik
    await connection.execute("INSERT INTO Genetic_Data (id_user, has_genetic_data, genetic_data_details) VALUES (?, ?, ?)", [userId, geneticData.has_genetic_data, geneticData.genetic_data_details]);

    // Menyimpan alergi
    await connection.execute("INSERT INTO Allergies (id_user, has_allergy, allergy_details) VALUES (?, ?, ?)", [userId, allergies.has_allergy, allergies.allergy_details]);

    // Menyimpan status vaksinasi
    await connection.execute("INSERT INTO Vaccination_Status (id_user, hepatitis, influenza) VALUES (?, ?, ?)", [userId, vaccinationStatus.hepatitis, vaccinationStatus.influenza]);

    // Menyimpan riwayat kesehatan mental
    await connection.execute("INSERT INTO Mental_Health_History (id_user, has_mental_health_condition, condition_details) VALUES (?, ?, ?)", [userId, mentalHealthHistory.has_mental_health_condition, mentalHealthHistory.condition_details]);

    // Menyimpan pengukuran kesehatan
    await connection.execute("INSERT INTO Health_Measurements (id_user, weight, height, blood_pressure, blood_sugar, cholesterol) VALUES (?, ?, ?, ?, ?, ?)", [
      userId,
      healthMeasurements.weight,
      healthMeasurements.height,
      healthMeasurements.blood_pressure,
      healthMeasurements.blood_sugar,
      healthMeasurements.cholesterol,
    ]);

    console.log("Health data submitted successfully for user:", userId);
    res.status(201).json({ message: "Health data submitted successfully." });
  } catch (error) {
    console.error("Error submitting health data:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (connection) {
      await connection.end(); // Pastikan koneksi ditutup
    }
  }
});

module.exports = router;
