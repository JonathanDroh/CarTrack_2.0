const db = require("../config/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Inloggningsförsök med email:", email);

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

        // 🔹 Hasha lösenordet och jämför
        const hashedInputPassword = crypto.createHash("sha256").update(password).digest("hex");

        if (hashedInputPassword !== user.losenord) {
            console.log("❌ Fel lösenord angivet!");
            return res.status(401).json({ error: "Felaktig e-post eller lösenord" });
        }

        console.log(`✅ Användare har rollen: ${user.roll}`);

        const token = jwt.sign(
            { id: user.anvandare_id, role: user.roll },
            process.env.JWT_SECRET || "hemlig_nyckel",
            { expiresIn: "2h" }
        );

        res.json({ token, role: user.roll });
    });
};
