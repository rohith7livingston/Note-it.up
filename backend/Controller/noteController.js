const Note = require('../Models/NotesModel');
const summarizeText = require('./summarizer'); // consistent naming
const asyncHandler = require('../Middleware/asyncHandler');

// @desc    Get all notes for a user
// @route   GET /api/notes
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
});

// @desc    Create a new note
// @route   POST /api/notes
const createNote = asyncHandler(async (req, res) => {
    const { title, detail } = req.body;
    if (!title || !detail) {
        res.status(400);
        throw new Error('Title and detail are required');
    }
    const note = await Note.create({
        title,
        detail,
        user: req.user.id,
    });
    res.status(201).json(note);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }
    // Ensure user owns the note
    if (note.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the modified document
        runValidators: true,
    });

    res.status(200).json(updatedNote);
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }
    // Ensure user owns the note
    if (note.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    
    await note.deleteOne();
    res.status(200).json({ id: req.params.id });
});

// @desc    Summarize text
// @route   POST /api/notes/summarize
const summarizeNote = asyncHandler(async (req, res) => {
    const { text_to_summarize } = req.body;
    if (!text_to_summarize) {
        res.status(400);
        throw new Error('No text provided to summarize');
    }
    const summary = await summarizeText(text_to_summarize);
    res.status(200).json({ summary_text: summary });
});

module.exports = { getNotes, createNote, updateNote, deleteNote, summarizeNote };