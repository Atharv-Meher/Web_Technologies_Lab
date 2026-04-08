
const express = require('express');
const app = express();

//GLOBAL MIDDLEWARE

// Middleware 1: Log request details
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[GLOBAL MIDDLEWARE] ${req.method} ${req.url} - ${timestamp}`);
    next(); // Pass control to next middleware
});

// Middleware 2: Additional global layer
app.use((req, res, next) => {
    console.log('[GLOBAL MIDDLEWARE 2] Request is being processed...');
    next();
});


// ROUTE-LEVEL MIDDLEWARE

// Custom middleware for a specific route
const checkAuth = (req, res, next) => {
    console.log('[ROUTE MIDDLEWARE] Checking authentication...');
    
    const isAuthenticated = true; // simulate auth
    
    if (isAuthenticated) {
        next(); // allow request
    } else {
        res.send('Access denied');
    }
};


// 3. ROUTES

// Public route
app.get('/', (req, res) => {
    res.send('Home Page - No middleware restriction');
});

// Route with middleware chaining
app.get('/dashboard', checkAuth, (req, res) => {
    res.send('Welcome to Dashboard');
});

// Multiple middleware in a single route
app.get('/profile',
    (req, res, next) => {
        console.log('[ROUTE MIDDLEWARE 1] Profile check...');
        next();
    },
    (req, res, next) => {
        console.log('[ROUTE MIDDLEWARE 2] Loading profile...');
        next();
    },
    (req, res) => {
        res.send('User Profile Page');
    }
);


//Start Server

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});