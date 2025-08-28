const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// HTML page routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/revolution', (req, res) => res.sendFile(path.join(__dirname, 'Revolution.html')));
app.get('/digital-evolution', (req, res) => res.sendFile(path.join(__dirname, 'Digital_Evolution.html')));
app.get('/korea-wave', (req, res) => res.sendFile(path.join(__dirname, 'Korea_Wave.html')));

// API endpoint to serve siteData.json
app.get('/api/siteData', (req, res) => {
  res.sendFile(path.join(__dirname, 'siteData.json'));
});

// Start the server
app.listen(port, () => {
  console.log(`Digital Korea website running at http://localhost:${port}`);
});
