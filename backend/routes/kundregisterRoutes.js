// routes/kundregisterRoutes.js
// Beskrivning: Definierar API-endpoints för kundregister. Kopplar anrop till controller-metoder.

const express = require("express");
const router = express.Router();
const kundregisterController = require("../controllers/kundregisterController");

// ==========================
// Kundregister – Hämtning
// ==========================
router.get("/", kundregisterController.getAllAktiva);
router.get("/history", kundregisterController.getAllHistory);

// ==========================
// Kundregister – Skapa & uppdatera
// ==========================
router.post("/add", kundregisterController.createKund);
router.put("/:id", kundregisterController.updateKund); // OBS! Se kommentar nedan
router.patch("/:id", kundregisterController.updateKund); // Välj en av dessa två

// ==========================
// Kundregister – Statusuppdateringar
// ==========================
router.patch("/send/:id", kundregisterController.markAsSent);
router.patch("/complete/:id", kundregisterController.markAsComplete);

// ==========================
// Kundregister – Radering
// ==========================
router.delete("/:id", kundregisterController.deleteKund);

module.exports = router;
