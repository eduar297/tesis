const Exercise = require("../models/exercise");

exports.createExercise = async (req, res) => {
  const { title, description, type, options } = req.body;

  try {
    if (req.user.role !== "professor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const exercise = new Exercise({
      title,
      description,
      type,
      options,
      createdBy: req.user._id,
    });
    await exercise.save();

    res.status(201).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating exercise" });
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find().populate("createdBy", "username");
    res.status(200).json({ exercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting exercises" });
  }
};

exports.getExerciseById = async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await Exercise.findById(id).populate(
      "createdBy",
      "username"
    );
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting exercise by id" });
  }
};

exports.updateExercise = async (req, res) => {
  const { id } = req.params;
  const { title, description, type, options } = req.body;

  try {
    if (req.user.role !== "professor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const exercise = await Exercise.findByIdAndUpdate(
      id,
      { title, description, type, options },
      { new: true }
    ).populate("createdBy", "username");
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating exercise" });
  }
};

exports.deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "professor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting exercise" });
  }
};
