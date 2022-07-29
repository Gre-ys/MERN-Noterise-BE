const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const validation = require("../middlewares/validationsMiddleware");
const { userRegisterSchema, userLoginSchema } = require("../validations/UserValidation");

// Register
router.post("/register", validation(userRegisterSchema), register);

//Login
router.post("/login", validation(userLoginSchema), login);

module.exports = router;
