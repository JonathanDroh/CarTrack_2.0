const db = require("../config/db");
const bcrypt = require("bcryptjs");

class UserModel {
  /**
   * Hämta alla användare (utan lösenord)
   */
  static async getAllUsers() {
    try {
      const [rows] = await db.promise().query("SELECT namn, email, roll FROM Anvandare");
      return rows;
    } catch (err) {
      console.error("Fel vid hämtning av användare:", err);
      throw err;
    }
  }

  /**
   * Hämta en användare baserat på email
   */
  static async getUserByEmail(email) {
    const [users] = await db.promise().query(
      "SELECT * FROM Anvandare WHERE email = ?",
      [email]
    );
    return users.length > 0 ? users[0] : null;
  }

  /**
   * Uppdatera lösenord för en användare
   */
  static async updatePassword(email, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const sql = "UPDATE Anvandare SET losenord = ? WHERE email = ?";
      const [result] = await db.promise().query(sql, [hashedPassword, email]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Fel vid lösenordsuppdatering:", err);
      throw err;
    }
  }

  /**
   * Lägg till en ny användare
   */
  static async addUser(namn, email, losenord, roll) {
    const hashedPassword = await bcrypt.hash(losenord, 10);
    const sql = `
      INSERT INTO Anvandare (namn, email, losenord, roll)
      VALUES (?, ?, ?, ?)
    `;
    const values = [namn, email, hashedPassword, roll];
    const [result] = await db.promise().query(sql, values);
    return result.affectedRows > 0;
  }

  /**
   * Ta bort en användare baserat på email
   */
  static async deleteUser(email) {
    const sql = "DELETE FROM Anvandare WHERE email = ?";
    const [result] = await db.promise().query(sql, [email]);
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;
