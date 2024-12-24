require('dotenv').config(); 
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('./routes/books');
const reviewsRoute = require('./routes/reviewsRoute');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
console.log('Mongo URI:', MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());

app.use('/api/books', booksRoute);
app.use('/api/reviews', reviewsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
