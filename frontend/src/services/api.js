import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://note-it-up.onrender.com/api',
});

// Request Interceptor: Add the auth token to every request if it exists
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

// --- Auth Endpoints ---
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const getUserProfile = () => API.get('/auth/me');

// --- Personal Note Endpoints ---
export const fetchNotes = () => API.get('/notes');
export const getNoteById = (id) => API.get(`/notes/${id}`); // We might not need this if we pass state
export const createNote = (noteData) => API.post('/notes', noteData);
export const updateNote = (id, noteData) => API.put(`/notes/${id}`, noteData);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const summarizeContent = (text) => API.post('/notes/summarize', { text_to_summarize: text });

// --- Collaboration Endpoints ---
export const createCollab = (collabData) => API.post('/collab/create', collabData);
export const joinCollab = (collabData) => API.post('/collab/join', collabData);
export const getCollabDetails = (noteId) => API.get(`/collab/details/${noteId}`);

export default API;