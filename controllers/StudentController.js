const { validationResult } = require("express-validator");
const UserController = require("../controllers/UserController");

// Models
const Student = require("../models/Student");
const User = require("../models/User");

class StudentController {
  async addStudent(req, res) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "A user with the same email already exists" });
    }

    if (!req.files.image) {
      return res.status(422).json({ fileError: "The image field is required" });
    }

    const image = req.files.image[0].filename;

    const {
      name,
      father_name,
      phone_number,
      nic,
      address,
      gender,
      batch,
      d_o_b,
      email,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    } = req.body;

    // Check if a batch with the same name already exists
    const studentNic = await Student.findOne({ nic });
    const studentEmail = await Student.findOne({ email });
    const studentRegNum = await Student.findOne({ reg_number });

    if (studentNic || studentEmail || studentRegNum) {
      return res.status(400).json({ error: "This student already exists" });
    }

    const student = new Student({
      name,
      father_name,
      phone_number,
      image,
      nic,
      address,
      gender,
      batch,
      d_o_b,
      email,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    });

    if (req.files.attachments) {
      student.attachments = req.files.attachments.map(
        (attachment) => attachment.filename
      );
    }

    const newstudent = await student.save();

    // Students as a User register
    UserController.addUser(res, { name, email });

    return res.json(newstudent);
  }

  // -------------------------------------------------------------------------

  // Student Update Function
  async updateStudent(req, res) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const {
      name,
      father_name,
      phone_number,
      nic,
      address,
      gender,
      batch,
      d_o_b,
      email,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    } = req.body;

    const newStudent = {
      name,
      father_name,
      phone_number,
      nic,
      address,
      gender,
      batch,
      d_o_b,
      email,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    };

    if (req.files.image) {
      newStudent.image = req.files.image[0].filename;
    }
    if (req.files.attachments) {
      newStudent.attachments = req.files.attachments.map(
        (attachment) => attachment.filename
      );
    }

    const student = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      newStudent,
      { new: true }
    );
    res.json(student);
  }
}

module.exports = new StudentController();
