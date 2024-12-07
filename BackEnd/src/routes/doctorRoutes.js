const express = require("express");
const { authenticate, checkRole } = require("../middlewares/authMiddleware");
const doctorController = require("../controllers/doctorController");
const router = express.Router();

// Route for doctor registration
router.post("/register", doctorController.registerDoctor);

// Route for accepting or declining a pregnant woman's request
router.put(
  "/pregnant-woman/:id/response",
  authenticate, // Authentication middleware
  checkRole("Doctor"), // Role-based authorization middleware
  doctorController.respondToPregnantWoman
);
// Route to get a list of doctors
router.get("/list", doctorController.getDoctorsList); // Ensure only admins can access the list
router.post(
  "/createappointment",
  authenticate,
  checkRole("Doctor"),
  doctorController.createAppointment
); // Ensure only admins can access the list

module.exports = router;
