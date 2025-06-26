import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import CollabPage from './pages/CollabPage';
import CollabEditor from './pages/CollabEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Routes with Sidebar Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-note" element={<CreateNote />} />
            <Route path="/edit-note/:id" element={<EditNote />} />
            <Route path="/collab" element={<CollabPage />} />
          </Route>
          {/* Route without Sidebar (full screen editor) */}
          <Route path="/collab-editor/:noteId" element={<CollabEditor />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;