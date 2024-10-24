const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Enable CORS to allow communication between frontend and backend
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Define a simple API endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});