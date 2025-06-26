const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../Controller/authController');
const { protect } = require('../Middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile); // Example protected route

module.exports = router;