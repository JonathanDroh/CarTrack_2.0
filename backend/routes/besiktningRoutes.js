const express = require("express");
const router = express.Router();
const besiktningController = require("../controllers/besiktningController");

// ==========================
// Besiktning – CRUD-routes
// ==========================
router.get("/", besiktningController.getAllBesiktning);
router.get("/besiktning/:id", besiktningController.getBesiktningById);
router.post("/add", besiktningController.addBesiktning);
router.patch("/:id", besiktningController.updateBesiktning);
router.delete("/:id", besiktningController.deleteBesiktning);

// ==========================
// Besiktning – Statusuppdateringar
// ==========================
router.patch("/send/:id", besiktningController.markAsSent);
router.patch("/complete/:id", besiktningController.markAsCompleted);

// ==========================
// Besiktning – Historik och statistik
// ==========================
router.get("/history", besiktningController.getCompletedBesiktning);
router.get("/stats", besiktningController.getStats);

module.exports = router;
