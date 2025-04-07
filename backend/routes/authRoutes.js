const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// ==========================
// Autentisering
// ==========================
router.post("/login", authController.loginUser);
router.post("/verify", authController.verifyToken);

module.exports = router;
