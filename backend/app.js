const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const db = new sqlite3.Database('./db/database.sqlite');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Example SQLite interaction
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)');
  db.run('INSERT INTO users (id, name) VALUES (1, "Liam")');
});

app.get('/api/user', (req, res) => {
    db.get('SELECT * FROM users WHERE id = 1', (err, row) => {
        if (err) {
        res.status(500).send('Database error');
        } else {
        res.send(`<p>User: ${row.name}</p>`);
        }
    });
});