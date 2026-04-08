const mongoose = require('mongoose');

// Schema Definition
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

// Model Creation
const User = mongoose.model('User', userSchema);

module.exports = User;