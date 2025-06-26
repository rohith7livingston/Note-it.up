import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../../services/api';
import './NoteCard.css';

const NoteCard = ({ note, onNoteDeleted }) => {
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        
        try {
            await deleteNote(note._id);
            onNoteDeleted(note._id); // Notify parent component to update UI
        } catch (err) {
            alert("Failed to delete note!");
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit-note/${note._id}`);
    };
    
    const handleCardClick = () => {
        navigate(`/edit-note/${note._id}`);
    }

    return (
        <div className="note-card" onClick={handleCardClick}>
            <div className="note-card-content">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-detail">{note.detail.substring(0, 120)}...</p>
            </div>
            <div className="note-card-footer">
                <p className="note-date">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </p>
                <div className="note-actions">
                    <button className="action-btn" onClick={handleEdit}><FiEdit /></button>
                    <button className="action-btn delete" onClick={handleDelete}><FiTrash2 /></button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;