const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const auth = require('../middleware/auth');

// Route to submit a new query
router.post('/submit', auth, async (req, res) => {
    const { text } = req.body;
    const userId = req.user._id;

    try {
        const newQuery = new Query({ user: userId, text });
        await newQuery.save();
        res.json({ message: 'Query submitted successfully', query: newQuery });
    } catch (err) {
        console.error('Error submitting query:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all queries (admin only)
router.get('/', auth, async (req, res) => {
    try {
        const queries = await Query.find().populate('user', 'username email');
        res.json(queries);
    } catch (err) {
        console.error('Error fetching queries:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
