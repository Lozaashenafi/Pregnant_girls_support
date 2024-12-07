const express = require("express");
const router = express.Router();
const { registerPregnantWoman } = require("../controllers/patientController");

// Register a pregnant woman and send a request to the doctor
router.post("/register", registerPregnantWoman);

module.exports = router;
