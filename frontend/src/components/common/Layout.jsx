import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../stylesheet/Layout.css'; // <-- ADD THIS IMPORT

const Layout = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="layout-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;