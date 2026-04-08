const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Create server
const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    // Default route
    let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);

    // Get file extension
    const ext = path.extname(filePath);

    // Set content type
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Handle file not found
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            // Success response
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(content);
            res.end();
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});