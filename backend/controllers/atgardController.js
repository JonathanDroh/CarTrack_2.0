const AtgardModel = require("../models/atgardModel");

/**
 * Hämta alla aktiva åtgärdsjobb
 */
exports.getAllAtgard = async (req, res, next) => {
  try {
    const data = await AtgardModel.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta ett specifikt åtgärdsjobb via ID
 */
exports.getAtgardById = async (req, res, next) => {
  try {
    const data = await AtgardModel.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Atgård hittades inte" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Skapa nytt åtgärdsjobb
 */
exports.addAtgard = async (req, res) => {
  const { regnr, anstalld, kommentar, sista_datum, anvandare_id } = req.body;

  if (!anvandare_id) {
    return res.status(400).json({ error: "anvandare_id krävs!" });
  }

  try {
    const atgard_id = await AtgardModel.add({ regnr, anstalld, kommentar, sista_datum, anvandare_id });
    res.json({ success: true, message: "Atgård tillagd", atgard_id });
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid tilläggning" });
  }
};

/**
 * Uppdatera ett åtgärdsjobb
 */
exports.updateAtgard = async (req, res) => {
  try {
    await AtgardModel.update(req.params.id, req.body);
    res.json({ success: true, message: "Atgård uppdaterad" });
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid uppdatering" });
  }
};

/**
 * Radera ett åtgärdsjobb
 */
exports.deleteAtgard = async (req, res) => {
  try {
    const result = await AtgardModel.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Atgård raderad" });
    } else {
      res.status(404).json({ error: "Atgård hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid borttagning" });
  }
};

/**
 * Hämta statistik över åtgärder
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await AtgardModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
  }
};

/**
 * Markera ett åtgärdsjobb som skickat (datum_s)
 */
exports.markAsSent = async (req, res, next) => {
  try {
    await AtgardModel.markAsSent(req.params.id);
    res.json({ success: true, message: "Atgård markerad som skickad" });
  } catch (err) {
    next(err);
  }
};

/**
 * Markera ett åtgärdsjobb som färdigt (datum_t)
 */
exports.markAsCompleted = async (req, res, next) => {
  try {
    await AtgardModel.markAsCompleted(req.params.id);
    res.json({ success: true, message: "Atgård markerad som färdig" });
  } catch (err) {
    next(err);
  }
};

/**
 * Hämta alla åtgärdsjobb som är färdiga (datum_t finns)
 */
exports.getCompletedAtgard = async (req, res) => {
  try {
    const data = await AtgardModel.getCompleted();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Serverfel vid hämtning av historik" });
  }
};

module.exports = exports;
