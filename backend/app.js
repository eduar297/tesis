/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");
const answersRouter = require("./routes/answers");
const feedbacksRouter = require("./routes/feedbacks");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

const MONGODB_URL = process.env.mongodb;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);
app.use("/answers", answersRouter);
app.use("/feedbacks", feedbacksRouter);

module.exports = app;
