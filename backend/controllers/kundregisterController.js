// Beskrivning: Controller för att hantera API-anrop för kundregister.

const KundregisterModel = require("../models/kundregisterModel");

// Hämta alla aktiva kundposter
exports.getAllAktiva = async (req, res) => {
  try {
    const rows = await KundregisterModel.getAll();
    res.json(rows);
  } catch (error) {
    console.error("Fel vid hämtning av kundposter:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
};

// Hämta historik (färdiga poster)
exports.getAllHistory = async (req, res) => {
  try {
    const rows = await KundregisterModel.getCompleted();
    res.json(rows);
  } catch (error) {
    console.error("Fel vid hämtning av kundhistorik:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
};

// Lägg till ny kund
exports.createKund = async (req, res) => {
  try {
    const insertId = await KundregisterModel.add(req.body);
    res.json({ success: true, insertId });
  } catch (error) {
    console.error("Fel vid skapande av kundpost:", error);
    res.status(500).json({ success: false, error: "Kunde inte lägga till kundpost" });
  }
};

// Uppdatera kund
exports.updateKund = async (req, res) => {
  try {
    await KundregisterModel.update(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error("Fel vid uppdatering av kundpost:", error);
    res.status(500).json({ success: false, error: "Kunde inte uppdatera kundpost" });
  }
};

// Radera kund
exports.deleteKund = async (req, res) => {
  try {
    await KundregisterModel.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Fel vid borttagning av kundpost:", error);
    res.status(500).json({ success: false, error: "Kunde inte ta bort post" });
  }
};

// Markera som skickad (sätt datum_s)
exports.markAsSent = async (req, res) => {
  try {
    await KundregisterModel.markAsSent(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Fel vid uppdatering av datum_s:", error);
    res.status(500).json({ success: false });
  }
};

// Markera som färdig
exports.markAsComplete = async (req, res) => {
  try {
    await KundregisterModel.markAsCompleted(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Fel vid uppdatering av datum_t:", error);
    res.status(500).json({ success: false });
  }
};
