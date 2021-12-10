const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const { MulterError } = require("multer");
const nodemailer = require("nodemailer");

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
    const fileExt = path.extname(file.originalname);

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
    check("father_name", "The father_name field is required").not().isEmpty(),
    check("phone_number", "The phone_number field is required").not().isEmpty(),
    check("nic", "The nic field is required").not().isEmpty(),
    check("address", "The address field is required").not().isEmpty(),
    check("gender", "The gender field is required").not().isEmpty(),
    check("batch", "The batch field is required").not().isEmpty(),
    check("d_o_b", "The d_o_b field is required").not().isEmpty(),
    check("email", "The email field is required").not().isEmpty(),
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

    if (email) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "ualikhan521@gmail.com", // generated ethereal user
          pass: "usmana35khan", // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Xplode Tech" <ualikhan521@gmail.com>', // sender address
        to: `${name} : ${email}`, // list of receivers
        subject: "Registation completed ✔", // Subject line
        html: " <img src='https://scontent.fkhi23-1.fna.fbcdn.net/v/t39.30808-6/p320x320/248649759_668126817901065_55636775377474404_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeG24VUx_Of99jwtMOSinw_ibgAgfZ9lryhuACB9n2WvKChqrs0TagkfkTimiz46tNTgt8GjnmAUFpp-obM08A9j&_nc_ohc=wlzjVRZQxh8AX9-RlRs&_nc_ht=scontent.fkhi23-1.fna&oh=325a06170e42bdc29b5e27c0f5968299&oe=61B28FD4'> <h2 style='text-align: center;'>Welcome To Xplode Tech</h2> <p style='margin-top: 10px;'>Your registation in <b>Xplode Tech</b> has been completed.</p>", // html body
      });
      console.log("Message sent: %s", info.messageId);
    }

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
    check("father_name", "The father_name field is required").not().isEmpty(),
    check("phone_number", "The phone_number field is required").not().isEmpty(),
    check("nic", "The nic field is required").not().isEmpty(),
    check("address", "The address field is required").not().isEmpty(),
    check("gender", "The gender field is required").not().isEmpty(),
    check("batch", "The batch field is required").not().isEmpty(),
    check("d_o_b", "The d_o_b field is required").not().isEmpty(),
    check("email", "The email field is required").not().isEmpty(),
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
