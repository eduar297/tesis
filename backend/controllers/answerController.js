const Answer = require("../models/answer");
const Exercise = require("../models/exercise");

exports.createAnswer = async (req, res) => {
  const { text, options, exerciseId } = req.body;

  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const answer = new Answer({
      text,
      type: exercise.type,
      options,
      createdBy: req.user._id,
      exerciseId: exerciseId,
    });

    await answer.save();

    res.status(201).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating answer" });
  }
};

exports.getAnswersByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const answers = await Answer.find({ createdBy: userId });

    res.status(200).json({ answers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting answers" });
  }
};

exports.getAnswerById = async (req, res) => {
  const { id } = req.params;

  try {
    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting answer by id" });
  }
};

exports.updateAnswer = async (req, res) => {
  const { id } = req.params;
  const { text, options, exerciseId } = req.body;

  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const answer = await Answer.findByIdAndUpdate(
      id,
      { text, type: exercise.type, options, exerciseId: exercise._id },
      { new: true }
    );
    if (!answer) {
      return res.status(404).json({ message: "Asnwer not found" });
    }
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating answer" });
  }
};

exports.deleteAnswer = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const answer = await Answer.findByIdAndDelete(id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting answer" });
  }
};
