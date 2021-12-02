const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  from_day: {
    type: String,
    required: true,
  },
  to_day: {
    type: String,
    required: true,
  },
  from_time: {
    type: String,
    required: true,
  },
  to_time: {
    type: String,
    required: true,
  },
});

const BatchModel = mongoose.model("Batch", BatchSchema);

module.exports = BatchModel;
