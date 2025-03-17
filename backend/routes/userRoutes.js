const express = require("express");
const router = express.Router();
const db = require("../config/db"); // ✅ Importerar MySQL-anslutningen

// 🔹 GET: Hämta alla användare från databasen
router.get("/users", async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT namn, email, losenord, roll FROM Anvandare"); // 🔹 Lägg till `.promise()`
        res.json(rows);
    } catch (err) {
        console.error("❌ Fel vid hämtning av användare:", err);
        res.status(500).json({ error: "Serverfel vid hämtning av användare" });
    }
});

module.exports = router;
