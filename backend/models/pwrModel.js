const db = require("../config/db");

class PWRModel {
  /**
   * Hämta alla aktiva PWR-jobb (där datum_t är NULL)
   */
  static async getAll() {
    const [rows] = await db.promise().query(
      "SELECT * FROM PWR WHERE datum_t IS NULL ORDER BY pwr_id DESC"
    );
    return rows;
  }

  /**
   * Hämta ett specifikt PWR-jobb
   */
  static async getById(pwr_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM PWR WHERE pwr_id = ?",
      [pwr_id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Lägg till ett nytt PWR-jobb
   */
  static async add({ regnr, delar, kommentar, anvandare_id, bild_url }) {
    const query = `
      INSERT INTO PWR (regnr, delar, kommentar, anvandare_id, bild_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [regnr, delar, kommentar, anvandare_id, bild_url];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera ett befintligt PWR-jobb
   */
  static async update(id, { regnr, delar, kommentar }) {
    const query = `
      UPDATE PWR
      SET regnr = ?, delar = ?, kommentar = ?
      WHERE pwr_id = ?
    `;
    await db.promise().query(query, [regnr, delar, kommentar, id]);
  }

  /**
   * Ta bort ett PWR-jobb
   */
  static async deleteById(pwr_id) {
    const query = "DELETE FROM PWR WHERE pwr_id = ?";
    const [result] = await db.promise().query(query, [pwr_id]);
    return result;
  }

  /**
   * Markera som skickad (sätt datum_s till dagens datum)
   */
  static async markAsSent(pwr_id) {
    const query = "UPDATE PWR SET datum_s = CURDATE() WHERE pwr_id = ?";
    await db.promise().query(query, [pwr_id]);
  }

  /**
   * Markera som färdig (sätt datum_t till dagens datum)
   */
  static async markAsCompleted(pwr_id) {
    const query = "UPDATE PWR SET datum_t = CURDATE() WHERE pwr_id = ?";
    await db.promise().query(query, [pwr_id]);
  }

  /**
   * Hämta färdiga jobb (datum_t ifyllt)
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT * FROM PWR WHERE datum_t IS NOT NULL ORDER BY pwr_id DESC"
    );
    return rows;
  }

  /**
   * Hämta statistik (antal totalt, aktiva, skickade)
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM PWR
    `);
    return rows[0];
  }

  /**
   * Uppdatera bildens sökväg
   */
  static async updateImagePath(id, imageUrl) {
    const query = "UPDATE PWR SET bild_url = ? WHERE pwr_id = ?";
    await db.promise().query(query, [imageUrl, id]);
  }
}

module.exports = PWRModel;
