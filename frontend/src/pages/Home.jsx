import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchNotes } from "../services/api";
import NoteCard from "../components/notes/NoteCard";
import "../stylesheet/Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const { data } = await fetchNotes();
        setNotes(data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  const onNoteDeleted = (deletedId) => {
    setNotes(notes.filter((note) => note._id !== deletedId));
  };

  if (loading) return <div className="status-message">Loading notes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>My Notes</h1>
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search notes..." />
        </div>
      </header>

      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} onNoteDeleted={onNoteDeleted} />
          ))
        ) : (
          <div className="empty-notes">
            <h3>No notes yet!</h3>
            <p>Click on "New Note" in the sidebar to get started.</p>
            <Link to="/create-note" className="btn">
              Create First Note
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}