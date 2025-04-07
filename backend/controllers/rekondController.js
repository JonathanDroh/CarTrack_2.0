const RekondModel = require("../models/rekondModel");

/**
 * Hämta alla aktiva rekonder
 */
exports.getAllRekond = async (req, res, next) => {
    try {
        const data = await RekondModel.getAll();
        res.json(data);
    } catch (err) {
        next(err);
    }
};

/**
 * Hämta en specifik rekond
 */
exports.getRekondById = async (req, res, next) => {
    try {
        const data = await RekondModel.getById(req.params.id);
        if (!data) {
            return res.status(404).json({ error: "Rekond hittades inte" });
        }
        res.json(data);
    } catch (err) {
        next(err);
    }
};

/**
 * Lägg till ny rekond
 */
exports.addRekond = async (req, res) => {
    const { regnr, firma, tvatt, kommentar, anvandare_id, bild_url } = req.body;

    if (!anvandare_id) {
        return res.status(400).json({ error: "anvandare_id krävs!" });
    }

    try {
        const rekond_id = await RekondModel.add({
            regnr,
            firma,
            tvatt,
            kommentar,
            anvandare_id,
            bild_url
        });
        res.json({ success: true, message: "Rekond tillagd", rekond_id });
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid tilläggning" });
    }
};

/**
 * Uppdatera en rekond
 */
exports.updateRekond = async (req, res) => {
    try {
        await RekondModel.update(req.params.id, req.body);
        res.json({ success: true, message: "Rekond uppdaterad" });
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid uppdatering" });
    }
};

/**
 * Radera en rekond
 */
exports.deleteRekond = async (req, res) => {
    try {
        const result = await RekondModel.deleteById(req.params.id);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Rekond raderad" });
        } else {
            res.status(404).json({ error: "Rekond hittades inte" });
        }
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid borttagning" });
    }
};

/**
 * Bilduppladdning permanent
 */
exports.uploadImage = async (req, res) => {
    const id = req.params.id;
    const filePath = req.file.path;

    try {
        await RekondModel.updateImagePath(id, filePath);
        res.json({ success: true, path: filePath });
    } catch (err) {
        res.status(500).json({ success: false, error: "Kunde inte spara bild" });
    }
};

/**
 * Temporär bilduppladdning (för förhandsgranskning)
 */
exports.uploadTempImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "Ingen bild mottagen." });
    }

    const bildUrl = req.file.path.replace(/\\/g, "/");
    res.json({ success: true, message: "Bild uppladdad", bild_url: bildUrl });
};

/**
 * Markera rekond som skickad (datum_s)
 */
exports.markAsSent = async (req, res, next) => {
    try {
        await RekondModel.markAsSent(req.params.id);
        res.json({ success: true, message: "Rekond markerad som skickad" });
    } catch (err) {
        next(err);
    }
};

/**
 * Markera rekond som färdig (datum_t)
 */
exports.markAsCompleted = async (req, res, next) => {
    try {
        await RekondModel.markAsCompleted(req.params.id);
        res.json({ success: true, message: "Rekond markerad som färdig" });
    } catch (err) {
        next(err);
    }
};

/**
 * Hämta statistik för rekond
 */
exports.getStats = async (req, res) => {
    try {
        const stats = await RekondModel.getStats();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid hämtning av statistik" });
    }
};

/**
 * Hämta historik (rekonder med datum_t ifyllt)
 */
exports.getCompletedRekond = async (req, res) => {
    try {
        const data = await RekondModel.getCompleted();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Serverfel vid hämtning av historik" });
    }
};

module.exports = exports;
