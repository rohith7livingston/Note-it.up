const mongoose = require('mongoose');

const CollabSchema = new mongoose.Schema({
    noteId: { type: String, required: true, unique: true }, // This is the "room name"
    passCode: { type: String, required: true }, // Storing as string is more flexible
    title: { type: String, required: true },
    detail: { type: String, required: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const collabModel = mongoose.model('Collab', CollabSchema);
module.exports = collabModel;