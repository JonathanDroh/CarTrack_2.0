const express = require("express");
const router = express.Router();
const atgardController = require("../controllers/atgardController");

// ==========================
// Åtgärder - Historik och statistik
// ==========================
router.get("/history", atgardController.getCompletedAtgard);
router.get("/stats", atgardController.getStats);

// ==========================
// CRUD-rutter för Åtgärder
// ==========================
router.get("/", atgardController.getAllAtgard);
router.get("/:id", atgardController.getAtgardById);
router.post("/add", atgardController.addAtgard);
router.patch("/:id", atgardController.updateAtgard);
router.delete("/:id", atgardController.deleteAtgard);

// ==========================
// Åtgärder - Statusuppdateringar
// ==========================
router.patch("/send/:id", atgardController.markAsSent);
router.patch("/complete/:id", atgardController.markAsCompleted);

module.exports = router;
