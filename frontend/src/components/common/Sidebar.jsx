// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle'; // <-- IMPORT
import '../../stylesheet/Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useAuth(); // <-- Get user object
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div>
                <div className="sidebar-logo">
                    <h3>Note-it.up</h3>
                </div>
                {/* --- USER PROFILE SECTION --- */}
                <div className="user-profile">
                    <div className="user-avatar">{user?.name?.charAt(0)}</div>
                    <div className="user-details">
                        <span>Hello,</span>
                        <h4>{user?.name}</h4>
                    </div>
                </div>
                {/* --- END USER PROFILE SECTION --- */}
                <nav className="sidebar-nav">
                    <NavLink to="/home" className="sidebar-link">
                        <FiHome />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/create-note" className="sidebar-link">
                        <FiPlusCircle />
                        <span>New Note</span>
                    </NavLink>
                    <NavLink to="/collab" className="sidebar-link">
                        <FiUsers />
                        <span>Collaborate</span>
                    </NavLink>
                </nav>
            </div>
            <div className="sidebar-footer">
                <ThemeToggle /> {/* <-- ADD THEME TOGGLE */}
                <div className="sidebar-link logout" onClick={handleLogout}>
                    <FiLogOut />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;