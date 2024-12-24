const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const reviewsRoute = require('./routes/reviewsRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API!');
});

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Mount reviews route
app.use('/reviews', reviewsRoute);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
