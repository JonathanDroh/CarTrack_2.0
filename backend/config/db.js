// db.js – Skapar och exporterar en MySQL-anslutningspool

const mysql = require("mysql2");

// Skapa anslutningspool med miljövariabler (eller default-värden)
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "CarTrack_Database",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testa anslutningen vid uppstart
db.getConnection((err, connection) => {
  if (err) {
    console.error("Kunde inte ansluta till MySQL:", err);
    return;
  }
  console.log("Ansluten till MySQL-databasen.");
  connection.release();
});

module.exports = db;
