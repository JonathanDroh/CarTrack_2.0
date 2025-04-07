const db = require("../config/db");

class BesiktningModel {
  /**
   * Hämta alla aktiva besiktningsposter (datum_t är NULL)
   */
  static async getAll() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Besiktning WHERE datum_t IS NULL ORDER BY besiktning_id DESC"
    );
    return rows;
  }

  /**
   * Hämta en specifik besiktningspost
   */
  static async getById(besiktning_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM Besiktning WHERE besiktning_id = ?",
      [besiktning_id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Lägg till en ny besiktningspost
   */
  static async add({ regnr, sista_bes_datum, kommentar, anvandare_id }) {
    const query = `
      INSERT INTO Besiktning (regnr, sista_bes_datum, kommentar, anvandare_id)
      VALUES (?, ?, ?, ?)
    `;
    const values = [regnr, sista_bes_datum, kommentar, anvandare_id];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera befintlig besiktningspost
   */
  static async update(id, data) {
    const fields = [];
    const values = [];

    if (data.regnr !== undefined) {
      fields.push("regnr = ?");
      values.push(data.regnr);
    }

    if (data.kommentar !== undefined) {
      fields.push("kommentar = ?");
      values.push(data.kommentar);
    }

    if (data.sista_bes_datum !== undefined) {
      fields.push("sista_bes_datum = ?");
      values.push(data.sista_bes_datum);
    }

    if (fields.length === 0) return;

    const query = `
      UPDATE Besiktning
      SET ${fields.join(", ")}
      WHERE besiktning_id = ?
    `;
    values.push(id);

    await db.promise().query(query, values);
  }

  /**
   * Ta bort en besiktningspost
   */
  static async deleteById(besiktning_id) {
    const query = "DELETE FROM Besiktning WHERE besiktning_id = ?";
    const [result] = await db.promise().query(query, [besiktning_id]);
    return result;
  }

  /**
   * Markera som skickad genom att sätta datum_s
   */
  static async markAsSent(besiktning_id) {
    const query = "UPDATE Besiktning SET datum_s = CURDATE() WHERE besiktning_id = ?";
    await db.promise().query(query, [besiktning_id]);
  }

  /**
   * Markera som färdig genom att sätta datum_t
   */
  static async markAsCompleted(besiktning_id) {
    const query = "UPDATE Besiktning SET datum_t = CURDATE() WHERE besiktning_id = ?";
    await db.promise().query(query, [besiktning_id]);
  }

  /**
   * Hämta statistik över besiktningsposter
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM Besiktning
    `);
    return rows[0];
  }

  /**
   * Hämta alla färdiga besiktningsposter (datum_t ifylld)
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Besiktning WHERE datum_t IS NOT NULL ORDER BY besiktning_id DESC"
    );
    return rows;
  }
}

module.exports = BesiktningModel;
