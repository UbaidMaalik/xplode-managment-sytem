const mongoose = require("mongoose");

const Batch = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
});

const BatchModel = mongoose.model("Batch", Batch);

module.exports = BatchModel;
