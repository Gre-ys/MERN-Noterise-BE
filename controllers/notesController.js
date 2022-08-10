const Note = require("../models/Note");
const User = require("../models/User");
const mongoose = require("mongoose");

const getNotes = async (req, res) => {
  // Get All Notes
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    // If Notes Not Found
    if (!notes || notes == null || notes.length == 0) return res.status(404).json({ error: "Notes Not Found!" });

    return res.status(200).json({ message: "Get All Notes!", notes });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getNotesById = async (req, res) => {
  // Get Id
  const { id } = req.params;

  // Cek Note Id Valid
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "Note Not Found!" });

  // Get Note
  try {
    const note = await Note.findById(id);

    // If Note Not Found
    if (!note || note == null || note.length == 0) return res.status(404).json({ error: "Note Not Found!" });

    return res.status(200).json({ message: "Get Note!", note });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getNotesByUser = async (req, res) => {
  // Cek User Login
  if (!req.user || req.user == null || req.user.length == 0) return res.status(404).json({ error: "User Not Registered!" });

  // Cek user_id Valid
  if (!mongoose.Types.ObjectId.isValid(req.user.id)) return res.status(404).json({ error: "User Not Registered!" });

  // Cek user_id Exist
  try {
    const userExist = await User.findById(req.user.id);
    if (!userExist) return res.status(404).json({ error: "User Not Registered!" });
  } catch (error) {
    return res.status(404).json({ error: "User Not Registered!" });
  }

  // Get Notes By User
  try {
    const notes = await Note.find({ user_id: req.user.id });

    // If Note Not Found
    if (!notes || notes == null || notes.length == 0) return res.status(404).json({ error: "Note Not Found!" });

    return res.status(200).json({ message: "Get Notes By User!", notes });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createNote = async (req, res) => {
  // Cek User Login
  if (!req.user || req.user == null || req.user.length == 0) return res.status(404).json({ error: "User Not Registered!" });

  // Cek user_id Valid
  if (!mongoose.Types.ObjectId.isValid(req.user.id)) return res.status(404).json({ error: "User Not Registered!" });

  // Cek user_id Exist
  try {
    const userExist = await User.findById(req.user.id);
    if (!userExist) return res.status(404).json({ error: "User Not Registered!" });
  } catch (error) {
    return res.status(404).json({ error: "User Not Registered!" });
  }

  // Create user
  try {
    await Note.create({ ...req.body, user_id: req.user.id });
    return res.status(201).json({ message: "Note Created!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateNote = async (req, res) => {
  // Get Id
  const { id } = req.params;

  // Cek Note Id Valid
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "Note Not Found!" });

  // Update Note
  try {
	  
	  // Check Who Create Note
	  const  noteExist = await Note.findById(id)
	  if(noteExist.user_id !== req.user.id) return res.status(403).json({error: "Dont Have Authority To Manipulate This Note!"})
	  
    const note = await Note.findByIdAndUpdate(id, { ...req.body, user_id: req.user.id });

    // If Note Not Found
    if (!note || note == null || note.length == 0) return res.status(404).json({ error: "Note Not Found!" });

    return res.status(200).json({ message: "Note Updated!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteNote = async (req, res) => {
  // Get Id
  const { id } = req.params;

  // Cek Note Id Valid
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "Note Not Found!" });

  // Delete Note
  try {
	  
	// Check Who Create Note
	const  noteExist = await Note.findById(id)
	if(noteExist.user_id !== req.user.id) return res.status(403).json({error: "Dont Have Authority To Manipulate This Note!"})
    
	const note = await Note.findByIdAndDelete(id);

    // If Note Not Found
    if (!note || note == null || note.length == 0) return res.status(404).json({ error: "Note Not Found!" });

    return res.status(200).json({ message: "Note Deleted!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { getNotes, getNotesById, getNotesByUser, createNote, updateNote, deleteNote };
