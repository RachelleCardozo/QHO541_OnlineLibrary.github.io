const mongoose = require('mongoose');

const userCommentSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    text: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    comments: [userCommentSchema] // Embed the user comment schema
});

module.exports = mongoose.model('User', userSchema);
