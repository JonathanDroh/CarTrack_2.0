const PWRModel = require("../models/pwrModel");

/**
 * Hämta alla aktiva PWR-jobb
 */
exports.getAllPWR = async (req, res, next) => {
  try {
    const data = await PWRModel.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta ett specifikt PWR-jobb
 */
exports.getPWRById = async (req, res, next) => {
  try {
    const data = await PWRModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "PWR hittades inte" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Lägg till nytt PWR-jobb
 */
exports.addPWR = async (req, res) => {
  const { regnr, delar, kommentar, anvandare_id, bild_url } = req.body;

  if (!anvandare_id) {
    return res.status(400).json({ error: "anvandare_id krävs!" });
  }

  try {
    const pwr_id = await PWRModel.add({
      regnr,
      delar,
      kommentar,
      anvandare_id,
      bild_url
    });
    res.json({ success: true, message: "PWR tillagt", pwr_id });
  } catch (err) {
    console.error("Fel vid tilläggning av PWR:", err);
    res.status(500).json({ error: "Serverfel vid tilläggning" });
  }
};

/**
 * Uppdatera ett befintligt PWR-jobb
 */
exports.updatePWR = async (req, res) => {
  try {
    await PWRModel.update(req.params.id, req.body);
    res.json({ success: true, message: "PWR uppdaterat" });
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid uppdatering" });
  }
};

/**
 * Hämta statistik för PWR
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await PWRModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
  }
};

/**
 * Radera ett PWR-jobb
 */
exports.deletePWR = async (req, res) => {
  try {
    const result = await PWRModel.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "PWR raderat" });
    } else {
      res.status(404).json({ error: "PWR hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid borttagning" });
  }
};

/**
 * Markera ett PWR-jobb som skickat (datum_s)
 */
exports.markAsSent = async (req, res, next) => {
  try {
    await PWRModel.markAsSent(req.params.id);
    res.json({ success: true, message: "PWR markerat som skickad" });
  } catch (err) {
    next(err);
  }
};

/**
 * Markera ett PWR-jobb som färdigt (datum_t)
 */
exports.markAsCompleted = async (req, res, next) => {
  try {
    await PWRModel.markAsCompleted(req.params.id);
    res.json({ success: true, message: "PWR markerat som färdig" });
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta historik (alla PWR-jobb där datum_t är satt)
 */
exports.getCompletedPWR = async (req, res) => {
  try {
    const data = await PWRModel.getCompleted();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};

/**
 * Ladda upp bild permanent till ett PWR-jobb
 */
exports.uploadImage = async (req, res) => {
  const id = req.params.id;
  const filePath = req.file.path;

  try {
    await PWRModel.updateImagePath(id, filePath);
    res.json({ success: true, path: filePath });
  } catch (err) {
    console.error("Fel vid bilduppladdning:", err);
    res.status(500).json({ success: false, error: "Kunde inte spara bild" });
  }
};

/**
 * Temporär uppladdning av bild för förhandsgranskning
 */
exports.uploadTempImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "Ingen bild mottagen." });
  }

  const bildUrl = req.file.path.replace(/\\/g, "/");
  res.json({ success: true, message: "Bild uppladdad", bild_url: bildUrl });
};

module.exports = exports;
