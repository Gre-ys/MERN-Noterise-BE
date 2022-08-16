const router = require("express").Router();
const { register, login, googleOk, logout, updateProfile } = require("../controllers/authController");
const validation = require("../middlewares/validationsMiddleware");
const validateAuth = require("../middlewares/validateAuthMiddleware")
const { userRegisterSchema, userLoginSchema } = require("../validations/UserValidation");
const passport = require("passport");

// Register
router.post("/register", validation(userRegisterSchema), register);

//Login
router.post("/login", validation(userLoginSchema), login);

//Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Auth Callback
router.get("/google/callback", passport.authenticate("google", { successRedirect: "/api/v1/google/ok", failureRedirect: "/api/v1/google/failed" }), function (req, res) {});

router.get("/google/failed", (req, res) => res.status(400).json({ error: "Failed To Authenticated With Google Account! Repeat or Go To Login For Manual Login" }));

router.get("/google/ok", googleOk);

// Logout
router.get("/logout", logout);

// Edit Profile
router.patch("/profile", [validateAuth,validation(userLoginSchema)],updateProfile)

module.exports = router;
