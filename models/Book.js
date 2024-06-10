const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true }
});

const bookSchema = new mongoose.Schema({
    isbn13: { type: String, required: true },
    isbn10: { type: String, required: true },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    categories: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    published_year: { type: Number, required: true },
    average_rating: { type: Number, required: true },
    num_pages: { type: Number, required: true },
    ratings_count: { type: Number, required: true },
    comments: [commentSchema] // Embed the comment schema
});

module.exports = mongoose.model('Book', bookSchema);
