const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({ // lowercase schema
    title: { type: String, required: true },
    detail: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// PascalCase model name, from the schema
const Note = mongoose.model('Note', noteSchema); 
module.exports = Note;