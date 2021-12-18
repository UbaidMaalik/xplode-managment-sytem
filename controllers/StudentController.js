const { validationResult } = require("express-validator");
const UserController = require("../controllers/UserController");

// Models
const Student = require("../models/Student");

class StudentController {
  async addStudent(req, res) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    if (!req.files.image) {
      return res.status(422).json({ fileError: "The image field is required" });
    }

    const image = req.files.image[0].filename;
    const attachments = req.files.attachments.map(
      (attachment) => attachment.filename
    );

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
      attachments,
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

    const newstudent = await student.save();

    // Students as a User register
    UserController.addUser({ name, email });

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
