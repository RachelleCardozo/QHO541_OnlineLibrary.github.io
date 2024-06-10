const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Fetch all categories
router.get('/categories', auth, async (req, res) => {
    try {
        const categories = await Book.distinct('categories');
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch books by category or search query
router.get('/', auth, async (req, res) => {
    const { category, search } = req.query;
    try {
        let query = {};
        if (category) {
            query.categories = category;
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }
        const books = await Book.find(query);
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch book by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('comments.user');
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add comment to book
router.post('/:id/comments', auth, async (req, res) => {
    const { text } = req.body;
    const bookId = req.params.id;
    const userId = req.user._id;

    console.log('Add comment request:', { text, bookId, userId }); // Log the input data

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            console.error('Book not found:', bookId); // Log the error
            return res.status(404).json({ error: 'Book not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found:', userId); // Log the error
            return res.status(404).json({ error: 'User not found' });
        }

        const commentId = new mongoose.Types.ObjectId(); // Generate a unique ObjectId for the comment
        const comment = { _id: commentId, user: userId, text };

        console.log('Adding comment to book:', comment); // Log comment being added
        book.comments.push(comment);

        // Validate book schema to catch validation errors
        const validationError = book.validateSync();
        if (validationError) {
            console.error('Validation error:', validationError);
            return res.status(400).json({ error: 'Validation error', details: validationError });
        }

        await book.save();

        console.log('Adding comment to user:', { _id: commentId, book: bookId, text }); // Log comment being added to user
        user.comments.push({ _id: commentId, book: bookId, text });

        // Validate user schema to catch validation errors
        const userValidationError = user.validateSync();
        if (userValidationError) {
            console.error('User validation error:', userValidationError);
            return res.status(400).json({ error: 'User validation error', details: userValidationError });
        }

        await user.save();

        res.json({ message: 'Comment added successfully', comment });
    } catch (err) {
        console.error('Error adding comment:', err); // Log the error
        res.status(500).json({ error: 'Server error' });
    }
});


// Delete comment from book
router.delete('/:bookId/comments/:commentId', auth, async (req, res) => {
    const { bookId, commentId } = req.params;
    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        const commentIndex = book.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) return res.status(404).json({ error: 'Comment not found' });

        if (book.comments[commentIndex].user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const comment = book.comments[commentIndex];
        book.comments.splice(commentIndex, 1);
        await book.save();

        // Remove comment from user's collection
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const userCommentIndex = user.comments.findIndex(userComment => userComment._id.toString() === commentId);
        if (userCommentIndex !== -1) {
            user.comments.splice(userCommentIndex, 1);
            await user.save();
        }

        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Mark book as favorite
router.post('/:id/favorite', auth, async (req, res) => {
    const bookId = req.params.id;
    try {
        const user = req.user; // The user is already fetched by the auth middleware

        if (!user.favourites.includes(bookId)) {
            user.favourites.push(bookId);
            await user.save();
        }

        res.json({ message: 'Book marked as favorite' });
    } catch (err) {
        console.error('Error marking book as favorite:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove book from favorites
router.delete('/:id/favorite', auth, async (req, res) => {
    const bookId = req.params.id;
    try {
        const user = req.user; // The user is already fetched by the auth middleware

        user.favourites = user.favourites.filter(fav => fav.toString() !== bookId);
        await user.save();

        res.json({ message: 'Book removed from favorites' });
    } catch (err) {
        console.error('Error removing book from favorites:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
