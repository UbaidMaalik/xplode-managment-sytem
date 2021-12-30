const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const StudentController = require("../controllers/StudentController");

// Models
const Student = require("../models/Student");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(
      null,
      `./uploads/students/${
        file.fieldname === "image" ? "images" : "attachments"
      }`
    );
  },

  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1]; //image/png
    return cb(null, `${file.fieldname}_${Date.now()}.${extension}`);
  },
});

// Upload Config
const upload = multer({
  storage,
  limits: { fileSize: 2048000 },

  fileFilter: function (req, file, cb) {
    const fileExt = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === "image") {
      // Check the type of file
      if (
        fileExt !== ".jpg" &&
        fileExt !== ".jpeg" &&
        fileExt !== ".png" &&
        fileExt !== ".gif"
      ) {
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    if (file.fieldname === "attachments") {
      if (
        fileExt !== ".jpg" &&
        fileExt !== ".jpeg" &&
        fileExt !== ".png" &&
        fileExt !== ".pdf" &&
        fileExt !== ".doc" &&
        fileExt !== ".docx" &&
        fileExt !== ".gif"
      ) {
        return cb("Only images,msword, pdf files are allowed!", false);
      }
    }
    cb(null, true);
  },
});

/**
 * @POST
 * @endpoint /students/add
 * @description Add a students
 */
router.post(
  "/add",
  [
    auth,
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      {
        name: "attachments",
        maxCount: 5,
      },
    ]),
  ],
  [
    check("name", "The name field is required").not().isEmpty(),
    check("father_name", "The father name field is required").not().isEmpty(),
    check("phone_number", "The phone number field is required").not().isEmpty(),
    check("nic", "The nic field is required").not().isEmpty(),
    check("address", "The address field is required").not().isEmpty(),
    check("gender", "The gender field is required").not().isEmpty(),
    check("batch", "The batch field is required").not().isEmpty(),
    check("d_o_b", "The d o b field is required").not().isEmpty(),
    check("email", "The email field is required").not().isEmpty(),
    check("admission_date", "The admission date field is required")
      .not()
      .isEmpty(),
    check("heard_from", "The heard from field is required").not().isEmpty(),
    check("reg_number", "The reg number field is required").not().isEmpty(),
    check("home_phone", "The home phone field is required").not().isEmpty(),
  ],
  StudentController.addStudent
);

/**
 * @route /students/:keywords
 * @type GET
 * @desc search students by name , regestation number
 */
router.get("/search/:keywords", async (req, res) => {
  try {
    const keywords = new RegExp(req.params.keywords, "gi");
    const student = await Student.find({
      $or: [
        { name: { $regex: keywords } },
        { reg_number: { $regex: keywords } },
      ],
    });
    res.json(student);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId")
      return res.status(404).json({ msg: "No student found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route /students/:keywords
 * @type GET
 * @desc search students by batch
 */
router.get("/searchbybatch/:batch", async (req, res) => {
  try {
    const student = await Student.find({ batch: req.params.batch });
    res.json(student);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId")
      return res.status(404).json({ msg: "No students found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @POST
 * @endpoint /students
 * @description Get all students
 */
router.get("/", async (req, res) => {
  const students = await Student.find().populate("batch", ["name"]);

  res.json(students);
});

/**
 * @POST
 * @endpoint /students/:id
 * @description Get students by id
 */
router.get("/:id", async (req, res) => {
  try {
    const students = await Student.findById(req.params.id).populate("batch", [
      "name",
    ]);
    res.json(students);
  } catch (error) {
    res.status(404).send("No batch Found");
  }
});

/**
 * @POST
 * @endpoint /students/:id/update
 * @description Update a students
 */
router.put(
  "/:id/update",
  auth,
  [
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
      {
        name: "attachments",
        maxCount: 5,
      },
    ]),
  ],
  [
    check("name", "The name field is required").not().isEmpty(),
    check("father_name", "The father name field is required").not().isEmpty(),
    check("phone_number", "The phone number field is required").not().isEmpty(),
    check("nic", "The nic field is required").not().isEmpty(),
    check("address", "The address field is required").not().isEmpty(),
    check("gender", "The gender field is required").not().isEmpty(),
    check("batch", "The batch field is required").not().isEmpty(),
    check("d_o_b", "The d o b field is required").not().isEmpty(),
    check("email", "The email field is required").not().isEmpty(),
    check("admission_date", "The admission date field is required")
      .not()
      .isEmpty(),
    check("heard_from", "The heard from field is required").not().isEmpty(),
    check("reg_number", "The reg number field is required").not().isEmpty(),
    check("home_phone", "The home phone field is required").not().isEmpty(),
  ],
  StudentController.updateStudent
);

/**
 * @GET
 * @endpoint /students/:id/delete
 * @description delete a students
 */
router.delete("/:id/delete", auth, async (req, res) => {
  await Student.findOneAndDelete({ _id: req.params.id });

  res.json({ message: "student deleted successfully" });
});

module.exports = router;
