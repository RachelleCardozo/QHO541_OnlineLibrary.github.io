const express = require('express');
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check for minimum password length
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ username, email, password }); // Store plain text password
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        if (password !== user.password) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Change password
router.post('/change-password', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Directly compare the plain text current password
        if (currentPassword !== user.password) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Store the new password as plain text
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
