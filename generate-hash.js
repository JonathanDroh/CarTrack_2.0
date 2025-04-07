// ============================================================================
// Fil: generate-hash.js
// Beskrivning: Används för att generera en bcrypt-hash av ett lösenord
// ============================================================================

const bcrypt = require("bcryptjs");

const plaintextPassword = "Cardeal3341"; // Lösenord att hasha
const saltRounds = 10;

// Skapa en bcrypt-hash
bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
  if (err) {
    console.error("Fel vid hashgenerering:", err);
    return;
  }

  console.log("Genererad bcrypt-hash:");
  console.log(hash);
});
