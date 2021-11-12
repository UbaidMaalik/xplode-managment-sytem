const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// Models
const User = require("../models/User");

/**
 * @POST
 * @endpoint /users/register
 * @description Register a new user
 */
router.post(
  "/register",
  [
    check("name", "The name field is required").not().isEmpty(),
    check("email")
      .not()
      .isEmpty()
      .withMessage("The email field is required")
      .isEmail()
      .withMessage("The provided email must be a valid email address"),
    check("password", "The password must be minimum 6 characters in length")
      .not()
      .isEmpty()
      .isLength(6),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "A user with the same email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    // Save the model
    const createdUser = await newUser.save();

    const payload = {
      user: {
        id: createdUser.id,
      },
    };

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
