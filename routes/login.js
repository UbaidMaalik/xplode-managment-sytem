const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
// middleware
const auth = require("../middlewares/auth");

// models
const User = require("../models/User");

/**
 * @GET
 * @endpoint /login
 * @description Get authenticated user data
 */
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});

/**
 * @POST
 * @endpoint /login
 * @description Authenticate a user
 */
router.post(
  "/",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("The email field is required")
      .isEmail()
      .withMessage("The provided email must be a valid email address"),
    check("password", "The password field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { email, password } = req.body;

    // Check if a user with this email exists or not
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Compare user's password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log(payload);
    // Generating jwt token from the user ID
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
  }
);

module.exports = router;
