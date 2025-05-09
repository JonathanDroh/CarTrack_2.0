require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Importera alla API-routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const lackeringRoutes = require("./routes/lackeringRoutes");
const rekondRoutes = require("./routes/rekondRoutes");
const verkstadRoutes = require("./routes/verkstadRoutes");
const pwrRoutes = require("./routes/pwrRoutes");
const besiktningRoutes = require("./routes/besiktningRoutes");
const korningRoutes = require("./routes/korningRoutes");
const atgardRoutes = require("./routes/atgardRoutes");
const kundregisterRoutes = require("./routes/kundregisterRoutes");
const historikRoutes = require("./routes/historikRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Statisk åtkomst till bilduppladdningar
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API-routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lackering", lackeringRoutes);
app.use("/api/rekond", rekondRoutes);
app.use("/api/verkstad", verkstadRoutes);
app.use("/api/pwr", pwrRoutes);
app.use("/api/besiktning", besiktningRoutes);
app.use("/api/korning", korningRoutes);
app.use("/api/atgard", atgardRoutes);
app.use("/api/kundregister", kundregisterRoutes);
app.use("/api/historik", historikRoutes);

// Test-endpoint för att verifiera att servern fungerar
app.get("/", (req, res) => {
    res.send("API är igång");
});

// Global felhantering
app.use(errorHandler);

// Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});
