// routes/rekondRoutes.js
// Beskrivning: Definierar API-endpoints för rekondjobb. Kopplar anrop till controller-metoder.

const express = require("express");
const router = express.Router();
const RekondController = require("../controllers/rekondController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// ==========================
// Rekond – Historik och statistik
// ==========================
router.get("/history", RekondController.getCompletedRekond);
router.get("/stats", RekondController.getStats);

// ==========================
// Rekond – CRUD-routes
// ==========================
router.get("/", RekondController.getAllRekond);
router.get("/:id", RekondController.getRekondById); // <-- ändrat
router.post("/add", RekondController.addRekond);
router.patch("/:id", RekondController.updateRekond);
router.delete("/:id", RekondController.deleteRekond);

// ==========================
// Rekond – Statusuppdateringar
// ==========================
router.patch("/send/:id", RekondController.markAsSent);
router.patch("/complete/:id", RekondController.markAsCompleted);

// ==========================
// Rekond – Bilduppladdning
// ==========================
router.post("/upload-temp", uploadMiddleware.single("image"), RekondController.uploadTempImage);
router.post("/:id/upload", uploadMiddleware.single("image"), RekondController.uploadImage);

module.exports = router;
