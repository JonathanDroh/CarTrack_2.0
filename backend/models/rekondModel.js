const db = require("../config/db");

class RekondModel {
  /**
   * Hämta alla rekonder
   */
  static async getAll() {
    const [rows] = await db.promise().query("SELECT * FROM Rekond");
    return rows;
  }

  /**
   * Hämta en specifik rekond
   */
  static async getById(rekond_id) {
    const [rows] = await db.promise().query("SELECT * FROM Rekond WHERE rekond_id = ?", [rekond_id]);
    return rows.length ? rows[0] : null;
  }

  /**
   * Lägg till en ny rekond
   */
  static async add({ regnr, firma, tvatt, kommentar, anvandare_id, bild_url }) {
    const query = `
      INSERT INTO Rekond (regnr, firma, tvatt, kommentar, anvandare_id, bild_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [regnr, firma, tvatt, kommentar, anvandare_id, bild_url];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera befintlig rekond
   */
  static async update(id, { regnr, firma, tvatt, kommentar }) {
    const query = `
      UPDATE Rekond
      SET regnr = ?, firma = ?, tvatt = ?, kommentar = ?
      WHERE rekond_id = ?
    `;
    await db.promise().query(query, [regnr, firma, tvatt, kommentar, id]);
  }

  /**
   * Ta bort rekond
   */
  static async deleteById(rekond_id) {
    const sql = "DELETE FROM Rekond WHERE rekond_id = ?";
    const [result] = await db.promise().query(sql, [rekond_id]);
    return result;
  }

  /**
   * Markera som skickad
   */
  static async markAsSent(rekond_id) {
    const query = "UPDATE Rekond SET datum_s = CURDATE() WHERE rekond_id = ?";
    await db.promise().query(query, [rekond_id]);
  }

  /**
   * Markera som färdig
   */
  static async markAsCompleted(rekond_id) {
    const query = "UPDATE Rekond SET datum_t = CURDATE() WHERE rekond_id = ?";
    await db.promise().query(query, [rekond_id]);
  }

  /**
   * Hämta färdiga rekonder
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Rekond WHERE datum_t IS NOT NULL ORDER BY rekond_id DESC"
    );
    return rows;
  }

  /**
   * Uppdatera bildens sökväg
   */
  static async updateImagePath(id, imageUrl) {
    const query = `UPDATE Rekond SET bild_url = ? WHERE rekond_id = ?`;
    await db.promise().query(query, [imageUrl, id]);
  }

  /**
   * Hämta statistik
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM Rekond
    `);
    return rows[0];
  }
}

module.exports = RekondModel;
