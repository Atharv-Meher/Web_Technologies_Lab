const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Datatbase Connections
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('DB Error:', err));

// Routes
app.use('/users', userRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});