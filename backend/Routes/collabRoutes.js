// backend/Routes/collabRoutes.js

const express = require('express');
const router = express.Router();
const { createCollabNote, joinCollabNote, getCollabNoteDetails } = require('../Controller/collabController');
const { protect } = require('../Middleware/authMiddleware');

// All collab routes should be protected
router.use(protect);

// Route to create a new collaborative note
router.post('/create', createCollabNote);

// Route to join an existing collaborative note
router.post('/join', joinCollabNote);

// Route to get the details of a specific collab note (for the editor)
router.get('/details/:noteId', getCollabNoteDetails);


module.exports = router;