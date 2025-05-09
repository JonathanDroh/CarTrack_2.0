// Beskrivning: Modell för hantering av databasoperationer för kundregister.

const db = require("../config/db");

class KundregisterModel {
    // Hämta alla aktiva poster (datum_t är NULL)
    static async getAll() {
      const [rows] = await db.promise().query(`
        SELECT k.*, a.namn AS anvandarnamn
        FROM Kundregister k
        LEFT JOIN Anvandare a ON k.anvandare_id = a.anvandare_id
        WHERE k.datum_t IS NULL
        ORDER BY k.kund_id DESC
      `);
      return rows;
    }
  
    // Hämta alla färdiga poster (datum_t ifylld)
    static async getCompleted() {
      const [rows] = await db.promise().query(`
        SELECT k.*, a.namn AS anvandarnamn
        FROM Kundregister k
        LEFT JOIN Anvandare a ON k.anvandare_id = a.anvandare_id
        WHERE k.datum_t IS NOT NULL
        ORDER BY k.kund_id DESC
      `);
      return rows;
    }

  // Hämta en enskild post
  static async getById(kund_id) {
    const [rows] = await db.promise().query(
      "SELECT * FROM Kundregister WHERE kund_id = ?",
      [kund_id]
    );
    return rows.length ? rows[0] : null;
  }

  // Lägg till ny kundpost (datum_s sätts automatiskt)
  static async add(data) {
    const {
      anvandare_id,
      k_regnmr,
      i_regnmr,
      telefonnummer,
      mailadress,
      kommentar,
      anteckning,
      bud,
      onskat_pris,
      inbytespris,
      trygg_inbytespris
    } = data;

    const query = `
      INSERT INTO Kundregister (
        anvandare_id, k_regnmr, i_regnmr, telefonnummer, mailadress,
        kommentar, anteckning, bud, onskat_pris, inbytespris, trygg_inbytespris, datum_s
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
    `;

    const values = [
      anvandare_id,
      k_regnmr,
      i_regnmr,
      telefonnummer,
      mailadress,
      kommentar,
      anteckning,
      bud,
      onskat_pris,
      inbytespris,
      trygg_inbytespris
    ];

    const [result] = await db.promise().query(query, values);
    return result.insertId;
  }

  // Uppdatera befintlig kundpost
  static async update(kund_id, data) {
    const {
      k_regnmr,
      i_regnmr,
      telefonnummer,
      mailadress,
      kommentar,
      anteckning,
      bud,
      onskat_pris,
      inbytespris,
      trygg_inbytespris
    } = data;

    const query = `
      UPDATE Kundregister
      SET
        k_regnmr = ?, i_regnmr = ?, telefonnummer = ?, mailadress = ?,
        kommentar = ?, anteckning = ?, bud = ?, onskat_pris = ?,
        inbytespris = ?, trygg_inbytespris = ?
      WHERE kund_id = ?
    `;

    const values = [
      k_regnmr,
      i_regnmr,
      telefonnummer,
      mailadress,
      kommentar,
      anteckning,
      bud,
      onskat_pris,
      inbytespris,
      trygg_inbytespris,
      kund_id
    ];

    await db.promise().query(query, values);
  }

  // Radera kundpost
  static async delete(kund_id) {
    const [result] = await db.promise().query(
      "DELETE FROM Kundregister WHERE kund_id = ?",
      [kund_id]
    );
    return result;
  }

  // Markera kund som färdig
  static async markAsCompleted(kund_id) {
    await db.promise().query(
      "UPDATE Kundregister SET datum_t = CURDATE() WHERE kund_id = ?",
      [kund_id]
    );
  }
}

module.exports = KundregisterModel;
