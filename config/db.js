const mongoose = require("mongoose");
const config = require("config");

const connectDB = async function () {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected...");
  } catch (error) {
    console.log(`Database error occured. ${error}`);
    process.exit();
  }
};

module.exports = connectDB;
