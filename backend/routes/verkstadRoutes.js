const express = require("express");
const router = express.Router();
const VerkstadController = require("../controllers/verkstadController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// ==========================
// Verkstad – CRUD-routes
// ==========================
router.get("/", VerkstadController.getAllVerkstad);
router.get("/verkstad/:id", VerkstadController.getVerkstadById);
router.post("/add", VerkstadController.addVerkstad);
router.patch("/:id", VerkstadController.updateVerkstad);
router.delete("/:id", VerkstadController.deleteVerkstad);

// ==========================
// Verkstad – Statusuppdateringar
// ==========================
router.patch("/send/:id", VerkstadController.markAsSent);
router.patch("/complete/:id", VerkstadController.markAsCompleted);

// ==========================
// Verkstad – Bilduppladdning
// ==========================
router.post("/upload-temp", uploadMiddleware.single("image"), VerkstadController.uploadTempImage);
router.post("/:id/upload", uploadMiddleware.single("image"), VerkstadController.uploadImage);

// ==========================
// Verkstad – Historik och statistik
// ==========================
router.get("/history", VerkstadController.getCompletedVerkstad);
router.get("/stats", VerkstadController.getStats);

module.exports = router;
