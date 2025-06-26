const Collab = require('../Models/CollabModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../Middleware/asyncHandler');

// @desc    Create a new collaborative note
// @route   POST /api/collab/create
const createCollabNote = asyncHandler(async (req, res) => {
    const { noteId, passCode, title, detail } = req.body;

    if (!noteId || !passCode || !title || !detail) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const noteExists = await Collab.findOne({ noteId });
    if (noteExists) {
        res.status(400);
        throw new Error('This Note ID is already taken. Please choose another.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassCode = await bcrypt.hash(passCode, salt);

    const newNote = await Collab.create({
        noteId,
        passCode: hashedPassCode,
        title,
        detail,
        admins: [req.user.id] // The creator is the first admin
    });

    res.status(201).json({
        message: 'Collaborative note created successfully!',
        note: newNote
    });
});

// @desc    Join an existing collaborative note
// @route   POST /api/collab/join
const joinCollabNote = asyncHandler(async (req, res) => {
    const { noteId, passCode } = req.body;

    if (!noteId || !passCode) {
        res.status(400);
        throw new Error('Note ID and Passcode are required.');
    }

    const note = await Collab.findOne({ noteId });
    if (!note) {
        res.status(404);
        throw new Error('Invalid Note ID or Passcode.');
    }

    const isMatch = await bcrypt.compare(passCode, note.passCode);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid Note ID or Passcode.');
    }
    
    await Collab.updateOne(
        { _id: note._id },
        { $addToSet: { participants: req.user.id } }
    );
    
    res.status(200).json({ message: 'Successfully joined the collaboration!', noteId: note.noteId });
});

// @desc    Get details for a single collab note
// @route   GET /api/collab/details/:noteId
const getCollabNoteDetails = asyncHandler(async (req, res) => {
    const note = await Collab.findOne({ noteId: req.params.noteId }).populate('admins', 'name email').populate('participants', 'name email');

    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    const userId = req.user._id.toString();
    const isAdmin = note.admins.some(admin => admin._id.toString() === userId);
    const isParticipant = note.participants.some(p => p._id.toString() === userId);
    
    if (!isAdmin && !isParticipant) {
        res.status(403); // Forbidden
        throw new Error("You are not authorized to view this note.");
    }

    res.status(200).json(note);
});

module.exports = {
    createCollabNote,
    joinCollabNote,
    getCollabNoteDetails
};