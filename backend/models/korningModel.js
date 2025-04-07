const db = require("../config/db");

class KorningModel {
  /**
   * Hämta alla aktiva körningar (där datum_t är NULL)
   */
  static async getAll() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Korning WHERE datum_t IS NULL ORDER BY korning_id DESC"
    );
    return rows;
  }

  /**
   * Hämta en specifik körning via ID
   */
  static async getById(korning_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM Korning WHERE korning_id = ?",
      [korning_id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Hämta statistik över körningar
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM Korning
    `);
    return rows[0];
  }

  /**
   * Lägg till en ny körning
   */
  static async add({ regnr, korningstyp, forare, kommentar, planerat_datum, anvandare_id }) {
    const query = `
      INSERT INTO Korning (regnr, korningstyp, forare, kommentar, planerat_datum, anvandare_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [regnr, korningstyp, forare, kommentar, planerat_datum, anvandare_id];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera en befintlig körning
   */
  static async update(id, data) {
    const fields = [];
    const values = [];

    if (data.regnr !== undefined) {
      fields.push("regnr = ?");
      values.push(data.regnr);
    }

    if (data.korningstyp !== undefined) {
      fields.push("korningstyp = ?");
      values.push(data.korningstyp);
    }

    if (data.forare !== undefined) {
      fields.push("forare = ?");
      values.push(data.forare);
    }

    if (data.kommentar !== undefined) {
      fields.push("kommentar = ?");
      values.push(data.kommentar);
    }

    if (data.planerat_datum !== undefined) {
      fields.push("planerat_datum = ?");
      values.push(data.planerat_datum);
    }

    if (fields.length === 0) return;

    const query = `
      UPDATE Korning
      SET ${fields.join(", ")}
      WHERE korning_id = ?
    `;
    values.push(id);

    await db.promise().query(query, values);
  }

  /**
   * Ta bort en körning
   */
  static async deleteById(korning_id) {
    const query = "DELETE FROM Korning WHERE korning_id = ?";
    const [result] = await db.promise().query(query, [korning_id]);
    return result;
  }

  /**
   * Markera som skickad (datum_s sätts till dagens datum)
   */
  static async markAsSent(korning_id) {
    const query = "UPDATE Korning SET datum_s = CURDATE() WHERE korning_id = ?";
    await db.promise().query(query, [korning_id]);
  }

  /**
   * Markera som färdig (datum_t sätts till dagens datum)
   */
  static async markAsCompleted(korning_id) {
    const query = "UPDATE Korning SET datum_t = CURDATE() WHERE korning_id = ?";
    await db.promise().query(query, [korning_id]);
  }

  /**
   * Hämta alla körningar med ifylld datum_t (historik)
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Korning WHERE datum_t IS NOT NULL ORDER BY korning_id DESC"
    );
    return rows;
  }
}

module.exports = KorningModel;
