const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// midleware
const auth = require("../middlewares/auth");

// model
const Course = require("../models/Course");

/**
 * @POST
 * @endpoint /course
 * @description Add a course
 */
router.post(
  "/add",
  auth,
  [
    check("name", "The name field is required").not().isEmpty(),
    check("duration", "The duration field is required").not().isEmpty(),
    check("duration_type", "The duration_type field is required")
      .not()
      .isEmpty(),
    check("code", "The code field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { name, duration, duration_type, code } = req.body;

    // Check if a course with the same name || code already exists
    const courseName = await Course.findOne({ name });
    const courseCode = await Course.findOne({ code });

    if (courseName || courseCode) {
      return res.status(400).json({ error: "This course already exists" });
    }

    const course = new Course({ name, duration, duration_type, code });

    const newCourse = await course.save();

    res.json(newCourse);
  }
);

/**
 * @GET
 * @endpoint /courses
 * @description Get all courses
 */
router.get("/", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

/**
 * @GET
 * @endpoint /courses/:id
 * @description Get single course
 */
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(404).send("No Course Found");
  }
});

/**
 * @GET
 * @endpoint /courses/:id/update
 * @description update a course
 */
router.put(
  "/:id/update",
  auth,
  [
    check("name", "The name field is required").not().isEmpty(),
    check("duration", "The duration field is required").not().isEmpty(),
    check("duration_type", "The duration_type field is required")
      .not()
      .isEmpty(),
    check("code", "The code field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { name, duration, duration_type, code } = req.body;

    const newData = {
      name,
      duration,
      duration_type,
      code,
    };

    const course = await Course.findByIdAndUpdate(
      { _id: req.params.id },
      newData,
      { new: true }
    );
    res.json(course);
  }
);

/**
 * @GET
 * @endpoint /courses/:id/delete
 * @description delete a course
 */
router.delete("/:id/delete", auth, async (req, res) => {
  await Course.findOneAndDelete({ _id: req.params.id });

  res.json({ message: "Course deleted successfully" });
});

module.exports = router;
