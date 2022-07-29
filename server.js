const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
require("dotenv").config();

// Middleware Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware Config
app.use(cors());
app.use(cookieParser());

// Middleware Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/notes", notesRoutes);

// Routes
app.get("/", (req, res) => res.send("meh"));
app.get("/api/v1", (req, res) => res.send("API Run"));

//Start Connect DB & Run Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connect To DB...");
    app.listen(4000, () => console.log("Server Running In Port: 4000"));
  })
  .catch((err) => console.log("Error: " + err));
