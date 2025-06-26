import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote, summarizeContent } from '../services/api';
import "../stylesheet/NoteEditor.css"; // Use the new shared CSS file

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title || !detail) {
      setError("Title and note content are required!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createNote({ title, detail });
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save note.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSummarize = async () => {
    if (detail.length < 50) {
      setError("Please enter at least 50 characters to summarize.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await summarizeContent(detail);
      setDetail(data.summary_text);
    } catch (err) {
      setError(err.response?.data?.message || "AI Summarizer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="note-editor-page">
      <div className="note-editor-container">
        <h2>Create a New Note</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="My Awesome Note Title"
          className="note-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="note-actions">
           <button className="btn btn-action" onClick={handleSummarize} disabled={loading}>
            {loading ? "..." : "AI Summarize ✨"}
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Note"}
          </button>
        </div>
        <textarea
          className="note-textarea"
          placeholder="Start your masterpiece here..."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default CreateNote;