const route = require("express").Router();
const { getNotes } = require("../controllers/notesController");

route.get("./", getNotes);

module.exports = route;
