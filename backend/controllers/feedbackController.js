const Answer = require("../models/answer");
const Feedback = require("../models/feedback");

exports.createFeedback = async (req, res) => {
  const { text, calification, options, answerId } = req.body;

  try {
    if (req.user.role !== "professor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const feedback = new Feedback({
      text,
      calification,
      type: answer.type,
      options,
      createdBy: req.user._id,
      answerId: answerId,
    });

    await feedback.save();

    res.status(201).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating feedback" });
  }
};

exports.getFeedbacksByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const feedbacks = await Feedback.find({ createdBy: userId });

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting feedbacks" });
  }
};

exports.getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting feedback by id" });
  }
};

exports.updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { text, calification, options, answerId } = req.body;

  try {
    if (req.user.role !== "professor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      {
        text,
        calification,
        type: answer.type,
        options,
        answerId: answerId,
      },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating feedback" });
  }
};

exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "professor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting feedback" });
  }
};
