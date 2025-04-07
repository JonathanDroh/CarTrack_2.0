const multer = require("multer");
const path = require("path");

// Konfigurerar lagring av uppladdade filer
const storage = multer.diskStorage({
    // Sätt målplats för uppladdade filer
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Skapa unikt filnamn baserat på tidsstämpel och originalnamn
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// Middleware som hanterar filuppladdning
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
