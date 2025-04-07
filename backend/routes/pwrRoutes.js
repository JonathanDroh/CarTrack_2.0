const express = require("express");
const router = express.Router();
const pwrController = require("../controllers/pwrController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// ==========================
// PWR – CRUD-routes
// ==========================
router.get("/", pwrController.getAllPWR);
router.get("/pwr/:id", pwrController.getPWRById);
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

// ==========================
// PWR – Historik och statistik
// ==========================
router.get("/history", pwrController.getCompletedPWR);
router.get("/stats", pwrController.getStats);

module.exports = router;
