const express = require("express");
const answerController = require("../controllers/answerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, answerController.createAnswer);

router.get("/", authMiddleware, answerController.getAnswersByUser);

router.get("/:id", authMiddleware, answerController.getAnswerById);

router.put("/:id", authMiddleware, answerController.updateAnswer);

router.delete("/:id", authMiddleware, answerController.deleteAnswer);

module.exports = router;
