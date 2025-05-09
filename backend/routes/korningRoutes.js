const express = require("express");
const router = express.Router();
const korningController = require("../controllers/korningController");

// ==========================
// Körning – Historik och statistik
// ==========================
router.get("/history", korningController.getCompletedKorning);
router.get("/stats", korningController.getStats);

// ==========================
// Körning – CRUD-routes
// ==========================
router.get("/", korningController.getAllKorning);
router.get("/:id", korningController.getKorningById);
router.post("/add", korningController.addKorning);
router.patch("/:id", korningController.updateKorning);
router.delete("/:id", korningController.deleteKorning);

// ==========================
// Körning – Statusuppdateringar
// ==========================
router.patch("/send/:id", korningController.markAsSent);
router.patch("/complete/:id", korningController.markAsCompleted);

module.exports = router;
