
// routes/historik.js
const express = require("express");
const router = express.Router();
const HistorikModel = require("../models/historikModel");

router.get("/", async (req, res) => {
  try {
    const historik = await HistorikModel.getAllHistory();
    res.json(historik);
  } catch (err) {
    console.error("Fel vid hämtning av historik:", err);
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
});

module.exports = router;
