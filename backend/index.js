require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// 🔹 Importera API-routes
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// 🔹 Registrera API-routes
app.use("/api/auth", authRoutes);

// 🔹 Testa att servern fungerar
app.get("/", (req, res) => {
    res.send("🚀 API är igång!");
});

// 🔹 Global felhantering
app.use(errorHandler);

// 🚀 Starta servern
app.listen(PORT, () => {
    console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});
