const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// midleware
const auth = require("../middlewares/auth");

// model
const Expense = require("../models/expense");

/**
 * @POST
 * @endpoint /expense
 * @description Add a expense
 */
router.post(
  "/add",
  auth,
  [
    check("title", "The name title is required").not().isEmpty(),
    check("amount", "The amount field is required").not().isEmpty(),
    check("date", "The date field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { title, amount, date, description } = req.body;

    const expense = new Expense({ title, amount, date, description });

    const newExpense = await expense.save();

    res.json(newExpense);
  }
);

/**
 * @GET
 * @endpoint /expense
 * @description Get all expense
 */
router.get("/", async (req, res) => {
  const expense = await Expense.find().sort({ createdAt: -1 });
  res.json(expense);
});

/**
 * @GET
 * @endpoint /expense/:id
 * @description Get single expense
 */
router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.json(expense);
  } catch (error) {
    res.status(404).send("No Expenses Found");
  }
});

/**
 * @GET
 * @endpoint /expense/:id/update
 * @description update a expense
 */
router.put(
  "/:id/update",
  auth,
  [
    check("title", "The title field is required").not().isEmpty(),
    check("amount", "The amount field is required").not().isEmpty(),
    check("date", "The date field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { title, amount, date, description } = req.body;

    const newData = {
      title,
      amount,
      date,
      description,
    };

    const expense = await Expense.findByIdAndUpdate(
      { _id: req.params.id },
      newData,
      { new: true }
    );
    res.json(expense);
  }
);

/**
 * @GET
 * @endpoint /expense/monthly
 * @description monthly expense
 */
router.post("/monthly", auth, async (req, res) => {
  const { date } = req.body;

  const splitDate = date.split("-");
  const year = parseInt(splitDate[0]);
  const month = parseInt(splitDate[1]);

  console.log(year);
  console.log(month);

  const monthlyExpense = await Expense.aggregate([
    { $addFields: { month: { $month: "$date" }, year: { $year: "$date" } } },
    { $match: { month, year } },
  ]);
  res.json(monthlyExpense);
});

/**
 * @GET
 * @endpoint /expense/:id/delete
 * @description delete a expense
 */
router.delete("/:id/delete", auth, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id });

  res.json({ message: "Expense deleted successfully" });
});

module.exports = router;
