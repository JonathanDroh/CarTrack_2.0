const db = require("../config/db");

class LackeringModel {
  /**
   * Hämta alla aktiva lackeringar (där datum_t är NULL)
   */
  static async getAll() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Lackering WHERE datum_t IS NULL ORDER BY lackering_id DESC"
    );
    return rows;
  }

  /**
   * Hämta en specifik lackering
   */
  static async getById(lackering_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM Lackering WHERE lackering_id = ?",
      [lackering_id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Lägg till ny lackering
   */
  static async add({ regnr, firma, delar, kommentar, anvandare_id, bild_url }) {
    const query = `
      INSERT INTO Lackering (regnr, firma, delar, kommentar, anvandare_id, bild_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [regnr, firma, delar, kommentar, anvandare_id, bild_url];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera en befintlig lackering
   */
  static async update(id, { regnr, firma, delar, kommentar }) {
    const query = `
      UPDATE Lackering
      SET regnr = ?, firma = ?, delar = ?, kommentar = ?
      WHERE lackering_id = ?
    `;
    await db.promise().query(query, [regnr, firma, delar, kommentar, id]);
  }

  /**
   * Uppdatera bildens URL
   */
  static async updateImagePath(id, imageUrl) {
    const query = "UPDATE Lackering SET bild_url = ? WHERE lackering_id = ?";
    await db.promise().query(query, [imageUrl, id]);
  }

  /**
   * Radera en lackering
   */
  static async deleteById(lackering_id) {
    const query = "DELETE FROM Lackering WHERE lackering_id = ?";
    const [result] = await db.promise().query(query, [lackering_id]);
    return result;
  }

  /**
   * Markera som skickad (sätt datum_s)
   */
  static async markAsSent(lackering_id) {
    const query = "UPDATE Lackering SET datum_s = CURDATE() WHERE lackering_id = ?";
    await db.promise().query(query, [lackering_id]);
  }

  /**
   * Markera som färdig (sätt datum_t)
   */
  static async markAsCompleted(lackering_id) {
    const query = "UPDATE Lackering SET datum_t = CURDATE() WHERE lackering_id = ?";
    await db.promise().query(query, [lackering_id]);
  }

  /**
   * Hämta statistik (antal totalt, aktiva och skickade)
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM Lackering
    `);
    return rows[0];
  }

  /**
   * Hämta alla färdiga lackeringar (datum_t ifylld)
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT lackering_id, regnr, firma, delar, kommentar, datum_s, datum_t FROM Lackering WHERE datum_t IS NOT NULL ORDER BY lackering_id DESC"
    );
    return rows;
  }
}

module.exports = LackeringModel;
