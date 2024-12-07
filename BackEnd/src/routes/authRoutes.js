const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

// Login route for both doctors and patients
router.post("/login", loginUser);

module.exports = router;
