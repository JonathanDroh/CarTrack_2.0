const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ==========================
// Användare – CRUD-routes
// ==========================
router.get("/", userController.getAllUsers);
router.post("/add", userController.addUser);
router.patch("/reset-password", userController.resetPassword);
router.delete("/:email", userController.deleteUser);

module.exports = router;
