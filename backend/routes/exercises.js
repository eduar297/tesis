const express = require("express");
const exerciseController = require("../controllers/exerciseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, exerciseController.createExercise);

router.get("/", authMiddleware, exerciseController.getExercises);

router.get("/:id", authMiddleware, exerciseController.getExerciseById);

router.put("/:id", authMiddleware, exerciseController.updateExercise);

router.delete("/:id", authMiddleware, exerciseController.deleteExercise);

module.exports = router;
