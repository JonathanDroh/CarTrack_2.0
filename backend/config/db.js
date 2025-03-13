const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "CarTrack_Database",
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        console.error("❌ Kunde inte ansluta till MySQL:", err);
        return;
    }
    console.log("✅ Ansluten till MySQL-databasen!");
});

module.exports = db;
