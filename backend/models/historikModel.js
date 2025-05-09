// models/historikModel.js

const db = require("../config/db");

class HistorikModel {
  static async getAllHistory() {
    const [rows] = await db.promise().query(`
      SELECT 'Rekond' AS typ, r.rekond_id AS id, r.regnr, r.datum_t AS datum, a.namn AS anvandarnamn
FROM Rekond r
JOIN Anvandare a ON r.anvandare_id = a.anvandare_id
WHERE r.datum_t IS NOT NULL

UNION ALL

SELECT 'Lackering' AS typ, l.lackering_id AS id, l.regnr, l.datum_t AS datum, a.namn AS anvandarnamn
FROM Lackering l
JOIN Anvandare a ON l.anvandare_id = a.anvandare_id
WHERE l.datum_t IS NOT NULL

UNION ALL

SELECT 'Verkstad' AS typ, v.verkstad_id AS id, v.regnr, v.datum_t AS datum, a.namn AS anvandarnamn
FROM Verkstad v
JOIN Anvandare a ON v.anvandare_id = a.anvandare_id
WHERE v.datum_t IS NOT NULL

UNION ALL

SELECT 'Åtgärd' AS typ, at.atgard_id AS id, at.regnr, at.datum_t AS datum, a.namn AS anvandarnamn
FROM Atgard at
JOIN Anvandare a ON at.anvandare_id = a.anvandare_id
WHERE at.datum_t IS NOT NULL

UNION ALL

SELECT 'PWR' AS typ, p.pwr_id AS id, p.regnr, p.datum_t AS datum, a.namn AS anvandarnamn
FROM PWR p
JOIN Anvandare a ON p.anvandare_id = a.anvandare_id
WHERE p.datum_t IS NOT NULL

UNION ALL

SELECT 'Körning' AS typ, k.korning_id AS id, k.regnr, k.datum_t AS datum, a.namn AS anvandarnamn
FROM Korning k
JOIN Anvandare a ON k.anvandare_id = a.anvandare_id
WHERE k.datum_t IS NOT NULL

UNION ALL

SELECT 'Besiktning' AS typ, b.besiktning_id AS id, b.regnr, b.datum_t AS datum, a.namn AS anvandarnamn
FROM Besiktning b
JOIN Anvandare a ON b.anvandare_id = a.anvandare_id
WHERE b.datum_t IS NOT NULL

ORDER BY datum DESC;

    `);
    return rows;
  }
}

module.exports = HistorikModel;
