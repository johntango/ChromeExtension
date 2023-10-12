const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

// Middleware to parse JSON payloads in POST requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Serve index.html at the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// GET route
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

// POST route
app.post('/hello', (req, res) => {
  const name = req.body.name || 'world';
  res.send(`Hello, ${name}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
