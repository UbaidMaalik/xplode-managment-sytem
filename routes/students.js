const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const { MulterError } = require("multer");

// Models
const Student = require("../models/Student");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
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
    const fileExt = path.extname(file.originalname);
    // Check the type of file
    if (
      fileExt !== ".jpg" &&
      fileExt !== ".jpeg" &&
      fileExt !== ".png" &&
      fileExt !== ".gif"
    ) {
      return cb(new Error("Only image files are allowed!"), false);
    }

    cb(null, true);
  },
}).single("image");

// Upload attachment Config
const uploadFiles = multer({
  storage,
  limits: { fileSize: 8048000 },

  fileFilter: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    // Check the type of file
    if (
      fileExt !== ".jpg" &&
      fileExt !== ".jpeg" &&
      fileExt !== ".png" &&
      fileExt !== ".pdf" &&
      fileExt !== ".doc" &&
      fileExt !== ".docx" &&
      fileExt !== ".gif"
    ) {
      return cb(new Error("Only images,msword, pdf files are allowed!"), false);
    }

    cb(null, true);
  },
}).array("file", 5);

/**
 * @POST
 * Upload students image
 */
router.post("/upload", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.json({
        error: "File type is invalid or size exceeds the limit",
      });
    } else {
      return res.json({ fileName: req.file.filename });
    }
  });
});

/**
 * @POST
 * Upload students attachment
 */
router.post("/upload/files", auth, (req, res) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.json({
        error: "File type is invalid or size exceeds the limit",
      });
    } else {
      return res.json({ fileName: req.files.filename });
    }
  });
});

/**
 * @POST
 * @endpoint /students/add
 * @description Add a students
 */
router.post(
  "/add",
  auth,
  [
    check("name", "The name field is required").not().isEmpty(),
    check("father_name", "The father_name field is required").not().isEmpty(),
    check("phone_number", "The phone_number field is required").not().isEmpty(),
    check("image", "The image field is required").not().isEmpty(),
    check("nic", "The nic field is required").not().isEmpty(),
    check("address", "The address field is required").not().isEmpty(),
    check("gender", "The gender field is required").not().isEmpty(),
    check("batch", "The batch field is required").not().isEmpty(),
    check("d_o_b", "The d_o_b field is required").not().isEmpty(),
    check("email", "The email field is required").not().isEmpty(),
    check("attachment", "The attachment field is required").not().isEmpty(),
    check("admission_date", "The admission_date field is required")
      .not()
      .isEmpty(),
    check("heard_from", "The heard_from field is required").not().isEmpty(),
    check("reg_number", "The reg_number field is required").not().isEmpty(),
    check("home_phone", "The home_phone field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const {
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
      attachment,
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
      attachment,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    });

    const newstudent = await student.save();

    res.json(newstudent);
  }
);

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
    check("name", "The name field is required").not().isEmpty(),
    check("father_name", "The father_name field is required").not().isEmpty(),
    check("phone_number", "The phone_number field is required").not().isEmpty(),
    check("image", "The image field is required").not().isEmpty(),
    check("nic", "The nic field is required").not().isEmpty(),
    check("address", "The address field is required").not().isEmpty(),
    check("gender", "The gender field is required").not().isEmpty(),
    check("batch", "The batch field is required").not().isEmpty(),
    check("d_o_b", "The d_o_b field is required").not().isEmpty(),
    check("email", "The email field is required").not().isEmpty(),
    check("attachment", "The attachment field is required").not().isEmpty(),
    check("admission_date", "The admission_date field is required")
      .not()
      .isEmpty(),
    check("heard_from", "The heard_from field is required").not().isEmpty(),
    check("reg_number", "The reg_number field is required").not().isEmpty(),
    check("home_phone", "The home_phone field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const {
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
      attachment,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    } = req.body;

    const newStudent = {
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
      attachment,
      admission_date,
      heard_from,
      reg_number,
      home_phone,
    };

    const student = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      newStudent,
      { new: true }
    );
    res.json(student);
  }
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
