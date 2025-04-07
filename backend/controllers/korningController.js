const KorningModel = require("../models/korningModel");

/**
 * Hämta alla aktiva körningar
 */
exports.getAllKorning = async (req, res, next) => {
  try {
    const data = await KorningModel.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta specifik körning via ID
 */
exports.getKorningById = async (req, res, next) => {
  try {
    const data = await KorningModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Korning hittades inte" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta statistik för körningar
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await KorningModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
  }
};

/**
 * Lägg till ny körning
 */
exports.addKorning = async (req, res) => {
  const { regnr, korningstyp, forare, kommentar, planerat_datum, anvandare_id } = req.body;

  if (!anvandare_id) {
    return res.status(400).json({ error: "anvandare_id krävs!" });
  }

  try {
    const korning_id = await KorningModel.add({
      regnr,
      korningstyp,
      forare,
      kommentar,
      planerat_datum,
      anvandare_id
    });

    res.json({ success: true, message: "Korning tillagd", korning_id });
  } catch (err) {
    console.error("Fel vid tilläggning av Korning:", err);
    res.status(500).json({ error: "Serverfel vid tilläggning" });
  }
};

/**
 * Uppdatera befintlig körning
 */
exports.updateKorning = async (req, res) => {
  try {
    await KorningModel.update(req.params.id, req.body);
    res.json({ success: true, message: "Korning uppdaterad" });
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid uppdatering" });
  }
};

/**
 * Radera körning
 */
exports.deleteKorning = async (req, res) => {
  try {
    const result = await KorningModel.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Korning raderad" });
    } else {
      res.status(404).json({ error: "Korning hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid borttagning" });
  }
};

/**
 * Markera körning som skickad (uppdaterar datum_s)
 */
exports.markAsSent = async (req, res, next) => {
  try {
    await KorningModel.markAsSent(req.params.id);
    res.json({ success: true, message: "Korning markerad som skickad" });
  } catch (err) {
    next(err);
  }
};

/**
 * Markera körning som färdig (uppdaterar datum_t)
 */
exports.markAsCompleted = async (req, res, next) => {
  try {
    await KorningModel.markAsCompleted(req.params.id);
    res.json({ success: true, message: "Korning markerad som färdig" });
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta historik (alla körningar där datum_t är ifyllt)
 */
exports.getCompletedKorning = async (req, res) => {
  try {
    const data = await KorningModel.getCompleted();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};

module.exports = exports;
