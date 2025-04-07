const BesiktningModel = require("../models/besiktningModel");

/**
 * Hämta alla aktiva besiktningsjobb
 */
exports.getAllBesiktning = async (req, res, next) => {
  try {
    const data = await BesiktningModel.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta ett specifikt besiktningsjobb via ID
 */
exports.getBesiktningById = async (req, res, next) => {
  try {
    const data = await BesiktningModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Besiktning hittades inte" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Lägg till nytt besiktningsjobb
 */
exports.addBesiktning = async (req, res) => {
  const { regnr, sista_bes_datum, kommentar, anvandare_id } = req.body;

  if (!anvandare_id) {
    return res.status(400).json({ error: "anvandare_id krävs!" });
  }

  try {
    const besiktning_id = await BesiktningModel.add({ regnr, sista_bes_datum, kommentar, anvandare_id });
    res.json({ success: true, message: "Besiktning tillagd", besiktning_id });
  } catch (err) {
    console.error("Fel vid tilläggning av Besiktning:", err);
    res.status(500).json({ error: "Serverfel vid tilläggning" });
  }
};

/**
 * Uppdatera befintligt besiktningsjobb
 */
exports.updateBesiktning = async (req, res) => {
  try {
    await BesiktningModel.update(req.params.id, req.body);
    res.json({ success: true, message: "Besiktning uppdaterad" });
  } catch (err) {
    console.error("Fel vid uppdatering av Besiktning:", err);
    res.status(500).json({ error: "Serverfel vid uppdatering" });
  }
};

/**
 * Radera ett besiktningsjobb
 */
exports.deleteBesiktning = async (req, res) => {
  try {
    const result = await BesiktningModel.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Besiktning raderad" });
    } else {
      res.status(404).json({ error: "Besiktning hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid borttagning" });
  }
};

/**
 * Markera besiktningsjobb som skickat (sätter datum_s)
 */
exports.markAsSent = async (req, res, next) => {
  try {
    await BesiktningModel.markAsSent(req.params.id);
    res.json({ success: true, message: "Besiktning markerad som skickad" });
  } catch (err) {
    next(err);
  }
};

/**
 * Markera besiktningsjobb som färdigt (sätter datum_t)
 */
exports.markAsCompleted = async (req, res, next) => {
  try {
    await BesiktningModel.markAsCompleted(req.params.id);
    res.json({ success: true, message: "Besiktning markerad som färdig" });
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta statistik över besiktningsjobb
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await BesiktningModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
  }
};

/**
 * Hämta historik (alla jobb där datum_t är satt)
 */
exports.getCompletedBesiktning = async (req, res) => {
  try {
    const data = await BesiktningModel.getCompleted();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};

module.exports = exports;
