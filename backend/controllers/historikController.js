const HistorikModel = require("../models/historikModel");

exports.getAllJobHistory = async (req, res) => {
  try {
    const allHistory = await HistorikModel.getAllJobHistory();
    res.json(allHistory);
  } catch (err) {
    console.error("Fel vid hämtning av historik:", err);
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};
