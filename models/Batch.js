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
  days: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
});

const BatchModel = mongoose.model("Batch", BatchSchema);

module.exports = BatchModel;
