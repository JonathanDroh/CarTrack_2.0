const VerkstadModel = require("../models/VerkstadModel");

/**
 * Hämta alla aktiva verkstadsjobb
 */
exports.getAllVerkstad = async (req, res, next) => {
  try {
    const data = await VerkstadModel.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta ett specifikt verkstadsjobb
 */
exports.getVerkstadById = async (req, res, next) => {
  try {
    const data = await VerkstadModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Verkstadsjobb hittades inte" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Skapa ett nytt verkstadsjobb
 */
exports.addVerkstad = async (req, res) => {
  const { regnr, typ_av_jobb, kommentar, anvandare_id, bild_url } = req.body;

  if (!anvandare_id) {
    return res.status(400).json({ error: "anvandare_id krävs!" });
  }

  try {
    const verkstad_id = await VerkstadModel.add({ regnr, typ_av_jobb, kommentar, anvandare_id, bild_url });
    res.json({ success: true, message: "Verkstadsjobb tillagt", verkstad_id });
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid tilläggning" });
  }
};

/**
 * Uppdatera verkstadsjobb
 */
exports.updateVerkstad = async (req, res) => {
  try {
    await VerkstadModel.update(req.params.id, req.body);
    res.json({ success: true, message: "Verkstadsjobb uppdaterat" });
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid uppdatering" });
  }
};

/**
 * Radera verkstadsjobb
 */
exports.deleteVerkstad = async (req, res) => {
  try {
    const result = await VerkstadModel.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Verkstadsjobb raderat" });
    } else {
      res.status(404).json({ error: "Verkstadsjobb hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid borttagning" });
  }
};

/**
 * Markera verkstadsjobb som skickat
 */
exports.markAsSent = async (req, res, next) => {
  try {
    await VerkstadModel.markAsSent(req.params.id);
    res.json({ success: true, message: "Verkstadsjobb markerat som skickad" });
  } catch (err) {
    next(err);
  }
};

/**
 * Markera verkstadsjobb som färdig
 */
exports.markAsCompleted = async (req, res, next) => {
  try {
    await VerkstadModel.markAsCompleted(req.params.id);
    res.json({ success: true, message: "Verkstadsjobb markerat som färdig" });
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta historik (alla verkstadsjobb med datum_t ifyllt)
 */
exports.getCompletedVerkstad = async (req, res) => {
  try {
    const data = await VerkstadModel.getCompleted();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};

/**
 * Hämta statistik för verkstadsjobb
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await VerkstadModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
  }
};

/**
 * Ladda upp permanent bild till verkstadsjobb
 */
exports.uploadImage = async (req, res) => {
  const id = req.params.id;
  const filePath = req.file.path;

  try {
    await VerkstadModel.updateImagePath(id, filePath);
    res.json({ success: true, path: filePath });
  } catch (err) {
    res.status(500).json({ success: false, error: "Kunde inte spara bild" });
  }
};

/**
 * Ladda upp temporär bild för förhandsvisning
 */
exports.uploadTempImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "Ingen bild mottagen." });
  }

  const bildUrl = req.file.path.replace(/\\/g, "/");
  res.json({ success: true, message: "Bild uppladdad", bild_url: bildUrl });
};
