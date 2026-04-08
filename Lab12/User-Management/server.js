const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('User API is running...');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});