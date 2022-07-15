const route = require("express").Router();
const { register } = require("../controllers/authController");

route.post("./register", register);

module.exports = route;
