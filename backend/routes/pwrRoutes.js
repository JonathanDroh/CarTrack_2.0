// routes/pwrRoutes.js
// Beskrivning: Definierar API-endpoints för PWR-jobb. Kopplar anrop till controller-metoder.

const express = require("express");
const router = express.Router();
const pwrController = require("../controllers/pwrController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// ==========================
// PWR – Historik och statistik
// ==========================
router.get("/history", pwrController.getCompletedPWR);
router.get("/stats", pwrController.getStats);

// ==========================
// PWR – CRUD-routes
// ==========================
router.get("/", pwrController.getAllPWR);
router.get("/:id", pwrController.getPWRById); // <-- ändrad från /pwr/:id till bara /:id
router.post("/add", pwrController.addPWR);
router.patch("/:id", pwrController.updatePWR);
router.delete("/:id", pwrController.deletePWR);

// ==========================
// PWR – Statusuppdateringar
// ==========================
router.patch("/send/:id", pwrController.markAsSent);
router.patch("/complete/:id", pwrController.markAsCompleted);

// ==========================
// PWR – Bilduppladdning
// ==========================
router.post("/upload-temp", uploadMiddleware.single("image"), pwrController.uploadTempImage);
router.post("/:id/upload", uploadMiddleware.single("image"), pwrController.uploadImage);

module.exports = router;
