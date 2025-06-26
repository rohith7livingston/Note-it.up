// src/pages/CollabEditor.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { getCollabDetails } from '../services/api';
import '../stylesheet/CollabEditor.css';
import { FiArrowLeft } from 'react-icons/fi';

const CollabEditor = () => {
  const { noteId } = useParams();
  const socket = useSocket();

  // State Management
  const [content, setContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('Loading...');
  const [participants, setParticipants] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Initial Data Fetching
  useEffect(() => {
    getCollabDetails(noteId)
      .then(response => {
        const { detail, title, admins, participants } = response.data;
        setContent(detail);
        setNoteTitle(title);
        // Combine admins and participants, ensuring no duplicates
        const allUsers = [...admins, ...participants];
        const uniqueUsers = Array.from(new Map(allUsers.map(user => [user._id, user])).values());
        setParticipants(uniqueUsers);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load note. You may not have access or it doesn't exist.");
        console.error(err);
        setLoading(false);
      });
  }, [noteId]);

  // Socket.IO Event Handling
  useEffect(() => {
    if (!socket) return;

    // Set initial connection status
    setIsConnected(socket.connected);

    // Connection events
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    // Custom events
    socket.emit('joinNote', noteId);
    socket.on('noteUpdate', (newContent) => setContent(newContent));
    socket.on('initialContent', (initialContent) => setContent(initialContent));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('noteUpdate');
      socket.off('initialContent');
    };
  }, [socket, noteId]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (socket && isConnected) {
      socket.emit('updateNote', { noteId, content: newContent });
    }
  };

  // Render Logic
  if (loading) {
    return <div className="status-message">Loading Collaboration Session...</div>;
  }

  if (error) {
    return (
        <div className="editor-error-container">
            <h1>Error</h1>
            <p>{error}</p>
            <Link to="/home" className="btn btn-primary">Back to Dashboard</Link>
        </div>
    )
  }

  return (
    <div className="collab-editor-page">
      <header className="collab-editor-header">
        <div className="header-left">
          <Link to="/home" className="back-link" title="Back to Dashboard">
            <FiArrowLeft />
          </Link>
          <div className="note-info">
            <h1>{noteTitle}</h1>
            <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>
        <div className="header-right">
            <div className="participants-list">
                {participants.map(user => (
                    <div key={user._id} className="avatar" title={user.name}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
      </header>
      <main className="editor-main">
        <textarea
          className="collab-textarea"
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing to collaborate in real-time..."
          disabled={!isConnected}
        />
      </main>
    </div>
  );
};

export default CollabEditor;