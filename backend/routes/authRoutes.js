const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // 🔹 Importera databasanslutning
const crypto = require("crypto");

const router = express.Router();

// 🔹 Inloggningsroute
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Inloggningsförsök med email:", email);

    if (!email || !password) {
        return res.status(400).json({ error: "Alla fält måste fyllas i" });
    }

    db.query("SELECT * FROM Anvandare WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("❌ Databasfel:", err);
            return res.status(500).json({ error: "Databasfel" });
        }

        if (result.length === 0) {
            console.log("❌ Ingen användare hittades med denna email:", email);
            return res.status(401).json({ error: "Felaktig e-post eller lösenord" });
        }

        const user = result[0];

        // 🔹 Hasha lösenordet och jämför med databasen
        const hashedInputPassword = crypto.createHash("sha256").update(password).digest("hex");

        if (hashedInputPassword !== user.losenord) {
            console.log("❌ Fel lösenord angivet för:", email);
            return res.status(401).json({ error: "Felaktig e-post eller lösenord" });
        }

        console.log(`✅ Användare inloggad: ${user.namn} (Roll: ${user.roll})`);

        const token = jwt.sign(
            { id: user.anvandare_id, role: user.roll },
            process.env.JWT_SECRET || "hemlig_nyckel",
            { expiresIn: "2h" }
        );

        res.json({ token, role: user.roll });
    });
});

// 🔹 Verifiera token
router.post("/verify", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("🔴 Ingen token skickades vid verifiering.");
        return res.status(401).json({ valid: false, error: "Ingen token skickades" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "hemlig_nyckel", (err, decoded) => {
        if (err) {
            console.log("🔴 Token är ogiltig:", err.message);
            return res.status(401).json({ valid: false, error: "Ogiltig token" });
        }

        console.log(`✅ Token verifierad: Användare ID ${decoded.id}, Roll: ${decoded.role}`);
        res.json({ valid: true, role: decoded.role });
    });
});

module.exports = router;
