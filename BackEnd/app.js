const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes"); // Import the auth routes
const doctorRoutes = require("./src/routes/doctorRoutes"); // Import the doctor routes
const patientRoutes = require("./src/routes/patientRoutes"); // Import the patient routes

dotenv.config(); // Load environment variables
const app = express();

// // CORS configuration to allow credentials from the frontend origin
// const corsOptions = {
//   origin: "http://localhost:5173", // Your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };

// Middleware
app.use(cors()); // Enable CORS with credentials support
app.use(bodyParser.json());

// Use /api prefix for routes from the auth router
app.use("/api", authRoutes); // This makes the login route available at /api/login
app.use("/api/doctors", doctorRoutes); // This makes the doctor routes available at /api/doctors
app.use("/api/patient", patientRoutes); // This makes the patient routes available at /api/patient

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app; // Export app for use in server.js
