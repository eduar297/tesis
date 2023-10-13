const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  calification: {
    type: Number,
    required: true,
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
        calification: Number,
        text: String,
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
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
