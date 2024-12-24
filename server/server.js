const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const reviewsRoute = require('./routes/reviewsRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests (Optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Health check route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  });

// Routes
app.use('/reviews', reviewsRoute);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
