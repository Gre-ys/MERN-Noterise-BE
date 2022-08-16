const router = require("express").Router();
const { getNotes, getNotesByUser, getNotesById, createNote, updateNote, deleteNote } = require("../controllers/notesController");
const validateAuth = require("../middlewares/validateAuthMiddleware");
const validation = require("../middlewares/validationsMiddleware");
const noteSchema = require("../validations/NoteValidation");
const apicache = require("apicache");
const cache = apicache.middleware;

// Get All Notes
router.get("/", [validateAuth, cache("3 minutes")], getNotes);

// Get Note By User
router.get("/user", validateAuth, getNotesByUser);

// Get Note By Id
router.get("/:id", validateAuth, getNotesById);

// Create Note
router.post("/", [validateAuth, validation(noteSchema)], createNote);

// Update Note
router.patch("/:id", [validateAuth, validation(noteSchema)], updateNote);

/// Delete Note
router.delete("/:id", [validateAuth], deleteNote);

module.exports = router;
