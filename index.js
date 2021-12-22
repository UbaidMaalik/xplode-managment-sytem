const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");

// Connect the database
connectDB();

// port
const PORT = 3000;

// encoding type
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// routes
app.use("/users", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/courses", require("./routes/courses"));
app.use("/batches", require("./routes/batches"));
app.use("/students", require("./routes/students"));

const directory = path.join(__dirname, "uploads");
app.use("/uploads", express.static(directory));

app.get("/", (req, res) => {
  res.send(`Server listening on PORT ${PORT}`);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
