import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateNote, fetchNotes } from '../services/api';
import "../stylesheet/NoteEditor.css"; // Use the new shared CSS file

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      setLoading(true);
      try {
        const { data: notes } = await fetchNotes();
        const noteToEdit = notes.find(n => n._id === id);
        if (noteToEdit) {
          setTitle(noteToEdit.title);
          setDetail(noteToEdit.detail);
        } else {
          setError("Note not found.");
        }
      } catch (err) {
        setError("Failed to fetch note data.");
      } finally {
        setLoading(false);
      }
    };
    loadNote();
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !detail) {
      setError("Title and note content are required!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await updateNote(id, { title, detail });
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note.");
    } finally {
      setLoading(false);
    }
  };

  if(loading && !title) return <div className="status-message">Loading editor...</div>

  return (
    <div className="note-editor-page">
      <div className="note-editor-container">
        <h2>Edit Note</h2>
         {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="My Awesome Note Title"
          className="note-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="note-actions">
          <button className="btn btn-primary" onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <textarea
          className="note-textarea"
          placeholder="Edit your masterpiece here..."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default EditNote;