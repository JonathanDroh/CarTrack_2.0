const db = require("../config/db");

class AtgardModel {
  /**
   * Hämta alla aktiva åtgärdsjobb (datum_t är NULL), sorterat med nyaste först
   */
  static async getAll() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Atgard WHERE datum_t IS NULL ORDER BY atgard_id DESC"
    );
    return rows;
  }

  /**
   * Hämta ett specifikt åtgärdsjobb baserat på ID
   */
  static async getById(atgard_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM Atgard WHERE atgard_id = ?",
      [atgard_id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Lägg till nytt åtgärdsjobb
   */
  static async add({ regnr, anstalld, kommentar, sista_datum, anvandare_id }) {
    const query = `
      INSERT INTO Atgard (regnr, anstalld, kommentar, sista_datum, anvandare_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [regnr, anstalld, kommentar, sista_datum, anvandare_id];
    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  /**
   * Uppdatera ett befintligt åtgärdsjobb
   */
  static async update(id, data) {
    const fields = [];
    const values = [];

    if (data.regnr !== undefined) {
      fields.push("regnr = ?");
      values.push(data.regnr);
    }
    if (data.anstalld !== undefined) {
      fields.push("anstalld = ?");
      values.push(data.anstalld);
    }
    if (data.kommentar !== undefined) {
      fields.push("kommentar = ?");
      values.push(data.kommentar);
    }
    if (data.sista_datum !== undefined) {
      fields.push("sista_datum = ?");
      values.push(data.sista_datum);
    }

    if (fields.length === 0) return;

    const query = `
      UPDATE Atgard
      SET ${fields.join(", ")}
      WHERE atgard_id = ?
    `;
    values.push(id);

    await db.promise().query(query, values);
  }

  /**
   * Hämta statistik för åtgärdsjobb
   */
  static async getStats() {
    const [rows] = await db.promise().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN datum_t IS NULL THEN 1 ELSE 0 END) AS aktiva,
        SUM(CASE WHEN datum_s IS NOT NULL AND datum_t IS NULL THEN 1 ELSE 0 END) AS skickade
      FROM Atgard
    `);
    return rows[0];
  }

  /**
   * Ta bort ett åtgärdsjobb
   */
  static async deleteById(atgard_id) {
    const query = "DELETE FROM Atgard WHERE atgard_id = ?";
    const [result] = await db.promise().query(query, [atgard_id]);
    return result;
  }

  /**
   * Markera åtgärdsjobb som skickat (sätt datum_s till dagens datum)
   */
  static async markAsSent(atgard_id) {
    const query = "UPDATE Atgard SET datum_s = CURDATE() WHERE atgard_id = ?";
    await db.promise().query(query, [atgard_id]);
  }

  /**
   * Markera åtgärdsjobb som färdigt (sätt datum_t till dagens datum)
   */
  static async markAsCompleted(atgard_id) {
    const query = "UPDATE Atgard SET datum_t = CURDATE() WHERE atgard_id = ?";
    await db.promise().query(query, [atgard_id]);
  }

  /**
   * Hämta alla färdiga åtgärdsjobb (datum_t är ifyllt)
   */
  static async getCompleted() {
    const [rows] = await db.promise().query(
      "SELECT * FROM Atgard WHERE datum_t IS NOT NULL ORDER BY atgard_id DESC"
    );
    return rows;
  }
}

module.exports = AtgardModel;
