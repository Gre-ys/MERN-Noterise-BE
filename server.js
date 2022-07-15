const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
app.get("/api/v1", (req, res) => res.send("API Run"));
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

// Middleware
app.use(cors);
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

//Start Connect DB & Run Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connect To DB...");
    app.listen(4000, () => console.log("Server Running In Port: 5000"));
  })
  .catch((err) => console.log("Error: " + err));
