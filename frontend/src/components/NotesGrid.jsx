import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client"; // Import Socket.io client
import './../stylesheet/NotesGrid.css';

const socket = io("http://localhost:3001"); // Connect to backend Socket.io

const NotesGrid = ({ userEmail }) => {
    const [notes, setNotes] = useState([]);
    const [collabNotes, setCollabNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        // Fetch personal notes
        axios.get(`http://localhost:3001/get-notes?email=${userEmail}`)
            .then(res => setNotes(res.data))
            .catch(err => console.error("Error fetching notes:", err));

        // Fetch collaborative notes where user is an admin
        axios.get(`http://localhost:3001/get-collab-notes?email=${userEmail}`)
            .then(res => setCollabNotes(res.data))
            .catch(err => console.error("Error fetching collaborative notes:", err));

        // Listen for real-time note updates
        socket.on("noteUpdated", updatedNote => {
            setCollabNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === updatedNote._id ? updatedNote : note
                )
            );
        });

        return () => {
            socket.off("noteUpdated");
        };
    }, [userEmail]);

    const handleEditClick = (note) => {
        setEditNote(note._id);
        setEditContent(note.detail);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/update-note/${editNote}`, { detail: editContent });

            // Emit real-time update
            socket.emit("updateNote", { _id: editNote, detail: editContent });

            // Update state and reset edit mode
            setCollabNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === editNote ? { ...note, detail: editContent } : note
                )
            );
            setEditNote(null);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div className="notes-grid">
            {/* Display Personal Notes */}
            {notes.map((note) => (
                <div key={note._id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.detail}</p>
                    <small>{new Date(note.createdAt).toLocaleDateString()}</small>
                </div>
            ))}

            {/* Display Collaborative Notes */}
            {collabNotes.map((note) => (
                <div key={note._id} className="note-card">
                    <h3>{note.title}</h3>
                    {editNote === note._id ? (
                        <>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <button onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <p>{note.detail}</p>
                            <small>{new Date(note.createdAt).toLocaleDateString()}</small>
                            <button onClick={() => handleEditClick(note)}>Edit</button>
                        </>
                    )}
                    <span className="collab-tag">Collaborative Note</span>
                </div>
            ))}
        </div>
    );
};

export default NotesGrid;
