const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/users", authMiddleware, authController.getUsers);

router.get("/students", authMiddleware, authController.getStudents);

module.exports = router;
