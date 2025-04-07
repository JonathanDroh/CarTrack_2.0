const db = require("../config/db");

class VerkstadModel {
  /**
   * Hämta alla aktiva verkstadsjobb (där datum_t är NULL)
   */
  static async getAll() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Verkstad WHERE datum_t IS NULL ORDER BY verkstad_id DESC"
    );
    return rows;
  }

  /**
   * Hämta ett specifikt verkstadsjobb via ID
   */
  static async getById(verkstad_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM Verkstad WHERE verkstad_id = ?",
      [verkstad_id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Lägg till ett nytt verkstadsjobb
   */
  static async add({ regnr, typ_av_jobb, kommentar, anvandare_id, bild_url }) {
    const query = `
      INSERT INTO Verkstad (regnr, typ_av_jobb, kommentar, anvandare_id, bild_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [regnr, typ_av_jobb, kommentar, anvandare_id, bild_url];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera ett befintligt verkstadsjobb
   */
  static async update(id, { regnr, typ_av_jobb, kommentar }) {
    const query = `
      UPDATE Verkstad
      SET regnr = ?, typ_av_jobb = ?, kommentar = ?
      WHERE verkstad_id = ?
    `;
    await db.promise().query(query, [regnr, typ_av_jobb, kommentar, id]);
  }

  /**
   * Ta bort ett verkstadsjobb via ID
   */
  static async deleteById(verkstad_id) {
    const query = "DELETE FROM Verkstad WHERE verkstad_id = ?";
    const [result] = await db.promise().query(query, [verkstad_id]);
    return result;
  }

  /**
   * Markera ett jobb som skickat (sätter datum_s)
   */
  static async markAsSent(verkstad_id) {
    const query = "UPDATE Verkstad SET datum_s = CURDATE() WHERE verkstad_id = ?";
    await db.promise().query(query, [verkstad_id]);
  }

  /**
   * Markera ett jobb som färdigt (sätter datum_t)
   */
  static async markAsCompleted(verkstad_id) {
    const query = "UPDATE Verkstad SET datum_t = CURDATE() WHERE verkstad_id = ?";
    await db.promise().query(query, [verkstad_id]);
  }

  /**
   * Hämta alla färdiga verkstadsjobb (datum_t är ifyllt)
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Verkstad WHERE datum_t IS NOT NULL ORDER BY verkstad_id DESC"
    );
    return rows;
  }

  /**
   * Statistik: total, aktiva och skickade jobb
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM Verkstad
    `);
    return rows[0];
  }

  /**
   * Uppdatera bildvägen för en verkstadspost
   */
  static async updateImagePath(id, imageUrl) {
    const query = "UPDATE Verkstad SET bild_url = ? WHERE verkstad_id = ?";
    await db.promise().query(query, [imageUrl, id]);
  }
}

module.exports = VerkstadModel;
