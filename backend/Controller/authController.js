const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const asyncHandler = require('../Middleware/asyncHandler');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    if (password !== confirmpassword) {
        res.status(400);
        throw new Error("Passwords do not match!");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); // Use 401 for Unauthorized
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is attached by the 'protect' middleware
    res.status(200).json(req.user);
});


module.exports = { registerUser, loginUser, getUserProfile };