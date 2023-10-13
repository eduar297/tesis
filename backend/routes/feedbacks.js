const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, feedbackController.createFeedback);

router.get("/", authMiddleware, feedbackController.getFeedbacksByUser);

router.get("/:id", authMiddleware, feedbackController.getFeedbackById);

router.put("/:id", authMiddleware, feedbackController.updateFeedback);

router.delete("/:id", authMiddleware, feedbackController.deleteFeedback);

module.exports = router;
