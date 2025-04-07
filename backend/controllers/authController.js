const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");

/**
 * Hanterar användarinloggning och returnerar JWT-token vid korrekt autentisering
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Alla fält måste fyllas i" });
    }

    try {
        const user = await authModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Felaktig e-post eller lösenord" });
        }

        const isMatch = await authModel.comparePasswords(password, user.losenord);

        if (!isMatch) {
            return res.status(401).json({ error: "Felaktig e-post eller lösenord" });
        }

        const token = jwt.sign(
            { id: user.anvandare_id, role: user.roll },
            process.env.JWT_SECRET || "hemlig_nyckel",
            { expiresIn: "2h" }
        );

        res.json({
            token,
            role: user.roll,
            anvandare_id: user.anvandare_id
        });

    } catch (err) {
        console.error("Fel vid inloggning:", err);
        res.status(500).json({ error: "Serverfel vid inloggning" });
    }
};

/**
 * Verifierar en JWT-token och returnerar användarinfo om token är giltig
 */
exports.verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ valid: false, error: "Ingen token skickades" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "hemlig_nyckel", (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, error: "Ogiltig token" });
        }

        res.json({ valid: true, user: { role: decoded.role, id: decoded.id } });
    });
};
