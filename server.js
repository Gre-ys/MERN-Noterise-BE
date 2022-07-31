const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
require("dotenv").config();

// Config Security
app.set("trust proxy", 1);
app.use(helmet());

// Config Limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Config File
require("./config/googleAuth");

// Middleware Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "Noterise Cookie Session",
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 2 * 1000,
      // secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware Config
app.use(cors());
app.use(cookieParser());

// Middleware Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/notes", notesRoutes);

// Routes
app.get("/", (req, res) => res.send("API RUN"));

//Start Connect DB & Run Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connect To DB...");
    app.listen(process.env.PORT || 4000, () => console.log("Server Running In Port: 4000"));
  })
  .catch((err) => console.log("Error: " + err));
