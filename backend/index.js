require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { errorHandler } = require('./Middleware/errorMiddleware');
const Collab = require('./Models/CollabModel'); // Require model at top level

// Route Imports
const authRoutes = require('./Routes/authRoutes');
const noteRoutes = require('./Routes/noteRoutes');
const collabRoutes = require('./Routes/collabRoutes');

// --- App & Server Setup ---
const app = express();
const server = http.createServer(app);

// --- Middleware ---
app.use(cors({
    origin: "https://note-it-up-1.onrender.com"
}));
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/collab', collabRoutes);

// --- WebSocket Setup ---
const io = new Server(server, {
    cors: {
      origin: "https://note-it-up-1.onrender.com",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on('joinNote', async (noteId) => {
        socket.join(noteId);
        console.log(`User ${socket.id} joined note room: ${noteId}`);
        
        try {
            const note = await Collab.findOne({ noteId });
            if (note) {
                socket.emit('initialContent', note.detail);
            }
        } catch (error) {
            console.error("Error fetching initial content for collab note:", error);
        }
    });
      
    socket.on('updateNote', ({ noteId, content }) => {
      socket.to(noteId).emit('noteUpdate', content);

      // NOTE: For a production app, you should debounce this database write
      // to avoid excessive calls on every keystroke.
       Collab.findOneAndUpdate({ noteId }, { detail: content }, { new: true })
        .catch(err => console.error("Error saving collab note update:", err));
    });
  
    socket.on('disconnect', () => {
      console.log("User disconnected:", socket.id);
    });
});

// --- Centralized Error Handling ---
// This should be the last piece of middleware
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));