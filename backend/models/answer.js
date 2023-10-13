const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: function () {
      return this.type === "text";
    },
  },
  type: {
    type: String,
    enum: ["trueFalse", "multipleChoice", "singleChoice", "text"],
    required: true,
  },
  options: {
    type: [
      {
        label: String,
        value: Boolean,
      },
    ],
    required: function () {
      return this.type !== "text";
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
