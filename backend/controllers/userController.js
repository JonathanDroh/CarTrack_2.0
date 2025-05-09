const userModel = require("../models/userModel");
const crypto = require("crypto");

/**
 * Hämta alla användare
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        if (!users) {
            return res.status(404).json({ error: "Inga användare hittades" });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid hämtning av användare" });
    }
};

/**
 * Återställ lösenord
 */
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "E-post och nytt lösenord krävs." });
    }

    try {
        // Hasha lösenordet med SHA256
        const hashedPassword = crypto.createHash("sha256").update(newPassword).digest("hex");

        const success = await userModel.updatePassword(email, hashedPassword);

        if (success) {
            res.json({ success: true, message: "Lösenordet har uppdaterats" });
        } else {
            res.status(404).json({ error: "Användaren hittades inte." });
        }
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid lösenordsuppdatering." });
    }
};

/**
 * Lägg till ny användare
 */
exports.addUser = async (req, res) => {
    const { namn, email, losenord, roll } = req.body;

    if (!namn || !email || !losenord || !roll) {
        return res.status(400).json({ error: "Alla fält måste fyllas i." });
    }

    try {
        const existingUser = await userModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ error: "En användare med denna e-post finns redan." });
        }

        // Hasha lösenordet med SHA256
        const hashedPassword = crypto.createHash("sha256").update(losenord).digest("hex");

        const success = await userModel.addUser(namn, email, hashedPassword, roll);

        if (success) {
            res.json({ success: true, message: "Anställd tillagd" });
        } else {
            res.status(500).json({ error: "Kunde inte lägga till anställd." });
        }
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid tilläggning av anställd." });
    }
};

/**
 * Ta bort en användare
 */
exports.deleteUser = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ error: "E-post krävs för att ta bort användare." });
    }

    try {
        const success = await userModel.deleteUser(email);

        if (success) {
            res.json({ success: true, message: "Användaren har raderats" });
        } else {
            res.status(404).json({ error: "Användaren hittades inte." });
        }
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid borttagning av användare." });
    }
};
