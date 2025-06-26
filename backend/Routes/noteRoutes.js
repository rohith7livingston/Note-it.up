const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote, summarizeNote } = require('../Controller/noteController');
const { protect } = require('../Middleware/authMiddleware');

// All these routes are protected
router.use(protect);

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .put(updateNote)
    .delete(deleteNote);

router.post('/summarize', summarizeNote);

module.exports = router;