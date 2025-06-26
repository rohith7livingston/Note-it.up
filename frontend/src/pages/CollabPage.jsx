// src/pages/CollabPage.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FiPlusCircle, FiLogIn } from 'react-icons/fi';
import { createCollab, joinCollab } from '../services/api';
import '../stylesheet/CollabPage.css';

const CollabPage = () => {
  const [createData, setCreateData] = useState({ noteId: '', passCode: '', title: 'New Collab Note', detail: 'Start collaborating...' });
  const [joinData, setJoinData] = useState({ noteId: '', passCode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await createCollab(createData);
      navigate(`/collab-editor/${response.data.note.noteId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create session.");
    } finally { setLoading(false); }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await joinCollab(joinData);
      navigate(`/collab-editor/${response.data.noteId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join session.");
    } finally { setLoading(false); }
  };

  return (
    <div className="collab-page-container">
        <div className="collab-header">
            <h1>Collaboration Hub</h1>
            <p>Start a new session or join an existing one to work with your team.</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='collab-grid'>
            <div className='collab-card'>
                <div className="card-icon-wrapper"><FiPlusCircle/></div>
                <h2>Create a Session</h2>
                <p>Start a new document and invite others to collaborate in real-time.</p>
                <form onSubmit={handleCreate} className="collab-form">
                    <input type='text' placeholder='Unique Session ID' value={createData.noteId} onChange={(e) => setCreateData({...createData, noteId: e.target.value})} required/>
                    <input type='password' placeholder='Session Passcode' value={createData.passCode} onChange={(e) => setCreateData({...createData, passCode: e.target.value})} required/>
                    <button className='btn btn-primary' type="submit" disabled={loading}>Create & Go</button>
                </form>
            </div>
            <div className='collab-card'>
                <div className="card-icon-wrapper"><FiLogIn/></div>
                <h2>Join a Session</h2>
                <p>Have an ID and passcode? Enter them here to jump into an existing note.</p>
                <form onSubmit={handleJoin} className="collab-form">
                    <input type='text' placeholder='Enter Session ID' value={joinData.noteId} onChange={(e) => setJoinData({...joinData, noteId: e.target.value})} required/>
                    <input type='password' placeholder='Enter Passcode' value={joinData.passCode} onChange={(e) => setJoinData({...joinData, passCode: e.target.value})} required/>
                    <button className='btn btn-primary' type="submit" disabled={loading}>Join Session</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default CollabPage;