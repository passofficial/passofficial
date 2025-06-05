const express = require('express');
require('dotenv').config();
const path = require('path'); // Node.js built-in module for path manipulation
const app = express();
const mongoose = require('mongoose');

// MongoDB connection string
// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection string
const dbURI = `mongodb+srv://storage208111:${process.env.MONGODB_PASSWORD}@thebox.iliksnb.mongodb.net/?retryWrites=true&w=majority&appName=thebox`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// --- CRUCIAL: Listen on the PORT provided by Render ---
const PORT = process.env.PORT || 3000; // Use Render's PORT, fallback to 3000 for local development

// --- Serve Static Files ---
// This line tells Express to serve static files from the 'public' directory.
// When a request comes in, Express will first look for a matching file in 'public/'.
// For example, a request to '/' will try to serve 'public/index.html'.
// A request to '/style.css' will try to serve 'public/style.css'.
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));

// --- Add Your Dynamic API Routes Here ---
// Example API route:
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from your Node.js API on Render!' });
});

// Example with a parameter:
app.get('/api/greet/:name', (req, res) => {
  const name = req.params.name;
  res.json({ message: `Greetings, ${name}!` });
});

// --- Handle Client-Side Routing (if applicable) ---
// If your original GitHub Pages site used client-side routing (e.g., React Router, Vue Router in history mode),
// you need to ensure that all unhandled routes fall back to your index.html.
// This allows the client-side router to take over.
// If your site is just plain HTML/CSS/JS without client-side routing, you might not need this.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Access your site at: http://localhost:${PORT}`);
  console.log(`Test API at: http://localhost:${PORT}/api/hello`);
});