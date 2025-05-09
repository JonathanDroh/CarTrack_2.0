const express = require("express");
const router = express.Router();
const LackeringController = require("../controllers/lackeringController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// ==========================
// Lackering – Historik och statistik
// ==========================
router.get("/history", LackeringController.getCompletedLackeringar);
router.get("/stats", LackeringController.getStats);

// ==========================
// Lackering – Bilduppladdning
// ==========================
router.post("/upload-temp", uploadMiddleware.single("image"), LackeringController.uploadTempImage);
router.post("/:id/upload", uploadMiddleware.single("image"), LackeringController.uploadImage);

// ==========================
// Lackering – CRUD-routes
// ==========================
router.get("/", LackeringController.getAllLackeringar);
router.get("/:id", LackeringController.getLackeringById);
router.post("/add", LackeringController.addLackering);
router.patch("/:id", LackeringController.updateLackering);
router.delete("/:id", LackeringController.deleteLackering);

// ==========================
// Lackering – Statusuppdateringar
// ==========================
router.patch("/send/:id", LackeringController.markAsSent);
router.patch("/complete/:id", LackeringController.markAsCompleted);

module.exports = router;
