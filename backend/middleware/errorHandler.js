/**
 * Central felhanterings-middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error("Serverfel:", err.message);
    res.status(err.statusCode || 500).json({
        error: err.message || "Serverfel"
    });
};

module.exports = errorHandler;
