const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// midleware
const auth = require("../middlewares/auth");

// model
const Batch = require("../models/Batch");

/**
 * @POST
 * @endpoint /batch
 * @description Add a batch
 */
router.post(
  "/add",
  auth,
  [
    check("name", "The name field is required").not().isEmpty(),
    check("course", "The course field is required").not().isEmpty(),
    check("days", "The days field is required").not().isEmpty(),
    check("timing", "The timing field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { name, course, days, timing } = req.body;

    // Check if a batch with the same name already exists
    const batchName = await Batch.findOne({ name });

    if (batchName) {
      return res.status(400).json({ error: "This batch already exists" });
    }

    const batch = new Batch({ name, course, days, timing });

    const newbatch = await batch.save();

    res.json(newbatch);
  }
);

/**
 * @GET
 * @endpoint /batches
 * @description Get all batches
 */
router.get("/", async (req, res) => {
  const batches = await Batch.find();
  res.json(batches);
});

/**
 * @GET
 * @endpoint /batchs/:id
 * @description Get single batch
 */
router.get("/:id", async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);
    res.json(batch);
  } catch (error) {
    res.status(404).send("No batch Found");
  }
});

/**
 * @GET
 * @endpoint /batches/:id/update
 * @description update a batch
 */
router.put(
  "/:id/update",
  auth,
  [
    check("name", "The name field is required").not().isEmpty(),
    check("course", "The course field is required").not().isEmpty(),
    check("days", "The days field is required").not().isEmpty(),
    check("timing", "The timing field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { name, course, days, timing } = req.body;

    const newData = {
      name,
      course,
      days,
      timing,
    };

    const batch = await Batch.findByIdAndUpdate(
      { _id: req.params.id },
      newData,
      { new: true }
    );
    res.json(batch);
  }
);

/**
 * @GET
 * @endpoint /batchs/:id/delete
 * @description delete a batch
 */
router.delete("/:id/delete", auth, async (req, res) => {
  await Batch.findOneAndDelete({ _id: req.params.id });

  res.json({ message: "batch deleted successfully" });
});

module.exports = router;