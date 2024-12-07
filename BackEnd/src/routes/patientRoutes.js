const express = require("express");
const router = express.Router();
const {
  registerPregnantWoman,
  getPatientById,
} = require("../controllers/patientController");

// Register a pregnant woman and send a request to the doctor
router.post("/register", registerPregnantWoman);
router.post("/:id", getPatientById);

module.exports = router;
