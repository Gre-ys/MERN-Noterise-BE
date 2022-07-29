const router = require("express").Router();
const { getNotes, getNotesByUser, getNotesById, createNote, updateNote, deleteNote } = require("../controllers/notesController");
const validateToken = require("../middlewares/validateTokenMiddleware");
const validation = require("../middlewares/validationsMiddleware");
const noteSchema = require("../validations/NoteValidation");

// Get All Notes
router.get("/", validateToken, getNotes);

// Get Note By User
router.get("/user", validateToken, getNotesByUser);

// Get Note By Id
router.get("/:id", validateToken, getNotesById);

// Create Note
router.post("/", [validateToken, validation(noteSchema)], createNote);

// Update Note
router.patch("/:id", [validateToken, validation(noteSchema)], updateNote);

/// Delete Note
router.delete("/:id", [validateToken], deleteNote);

module.exports = router;
