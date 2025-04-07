const db = require("../config/db");
const crypto = require("crypto");

/**
 * Hämta en användare baserat på e-postadress
 */
exports.getUserByEmail = async (email) => {
  const [users] = await db.promise().query(
    "SELECT anvandare_id, namn, email, losenord, roll FROM Anvandare WHERE email = ?",
    [email]
  );
  return users.length > 0 ? users[0] : null;
};

/**
 * Jämför ett inskrivet lösenord med ett SHA256-hashat lösenord från databasen
 */
exports.comparePasswords = async (inputPassword, hashedPassword) => {
  const hash = crypto.createHash("sha256").update(inputPassword).digest("hex");
  return hash === hashedPassword;
};
