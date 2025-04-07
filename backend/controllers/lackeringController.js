const LackeringModel = require("../models/LackeringModel");

/**
 * Hämta alla lackeringar
 */
exports.getAllLackeringar = async (req, res, next) => {
  try {
    const lackeringar = await LackeringModel.getAll();
    res.json(lackeringar);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta en specifik lackering
 */
exports.getLackeringById = async (req, res, next) => {
  try {
    const lackering = await LackeringModel.getById(req.params.id);
    if (!lackering) {
      return res.status(404).json({ error: "Lackering hittades inte" });
    }
    res.json(lackering);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta statistik för lackeringar
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await LackeringModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
  }
};

/**
 * Lägg till ny lackering
 */
exports.addLackering = async (req, res) => {
  const { regnr, firma, delar, kommentar, anvandare_id, bild_url } = req.body;

  if (!anvandare_id) {
    return res.status(400).json({ error: "anvandare_id krävs!" });
  }

  try {
    const lackering_id = await LackeringModel.add({
      regnr,
      firma,
      delar,
      kommentar,
      anvandare_id,
      bild_url
    });

    if (lackering_id) {
      res.json({ success: true, message: "Lackering tillagd", lackering_id });
    } else {
      res.status(500).json({ error: "Kunde inte lägga till lackering." });
    }
  } catch (err) {
    console.error("Fel vid tilläggning av lackering:", err);
    res.status(500).json({ error: "Serverfel vid tilläggning av lackering." });
  }
};

/**
 * Radera en lackering
 */
exports.deleteLackering = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ success: false, error: "Saknar giltigt lackering_id" });
  }

  try {
    const result = await LackeringModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Lackering raderad" });
    } else {
      res.status(404).json({ success: false, error: "Lackering hittades inte" });
    }
  } catch (err) {
    console.error("Fel vid borttagning av lackering:", err);
    res.status(500).json({ success: false, error: "Serverfel vid borttagning" });
  }
};

/**
 * Uppdatera en lackering
 */
exports.updateLackering = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    await LackeringModel.update(id, updatedData);
    res.json({ success: true, message: "Lackering uppdaterad" });
  } catch (err) {
    console.error("Fel vid uppdatering:", err);
    res.status(500).json({ success: false, error: "Serverfel vid uppdatering" });
  }
};

/**
 * Ladda upp och koppla en bild till en lackering
 */
exports.uploadImage = async (req, res) => {
  const id = req.params.id;
  const filePath = req.file.path;

  try {
    await LackeringModel.updateImagePath(id, filePath);
    res.json({ success: true, path: filePath });
  } catch (err) {
    console.error("Fel vid bilduppladdning:", err);
    res.status(500).json({ success: false, error: "Kunde inte spara bild" });
  }
};

/**
 * Temporär uppladdning av bild
 */
exports.uploadTempImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "Ingen bild mottagen." });
  }

  const bildUrl = req.file.path.replace(/\\/g, "/");
  res.json({ success: true, message: "Bild uppladdad", bild_url: bildUrl });
};

/**
 * Markera lackering som skickad (datum_s)
 */
exports.markAsSent = async (req, res, next) => {
  try {
    await LackeringModel.markAsSent(req.params.id);
    res.json({ success: true, message: "Lackering markerad som skickad" });
  } catch (err) {
    next(err);
  }
};

/**
 * Markera lackering som färdig (datum_t)
 */
exports.markAsCompleted = async (req, res, next) => {
  try {
    await LackeringModel.markAsCompleted(req.params.id);
    res.json({ success: true, message: "Lackering markerad som färdig" });
  } catch (err) {
    console.error("Fel i markAsCompleted:", err);
    next(err);
  }
};

/**
 * Hämta alla slutförda lackeringar
 */
exports.getCompletedLackeringar = async (req, res) => {
  try {
    const lackeringar = await LackeringModel.getCompleted();
    res.json(lackeringar);
  } catch (err) {
    console.error("Fel vid hämtning av historik:", err);
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};

module.exports = exports;
