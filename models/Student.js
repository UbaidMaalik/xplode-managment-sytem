const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    d_o_b: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    attachments: {
      type: Array,
    },
    admission_date: {
      type: Date,
      required: true,
    },
    heard_from: {
      type: String,
      required: true,
    },
    reg_number: {
      type: String,
      required: true,
    },
    home_phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
