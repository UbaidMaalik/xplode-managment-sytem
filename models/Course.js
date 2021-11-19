const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  duration_type: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const CourseModel = mongoose.model("Course", Course);

module.exports = CourseModel;
