const express = require('express');
const Review = require('../models/reviewsModel');
const router = express.Router();

// Get all reviews for a book
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Add a review
router.post('/', async (req, res) => {
  const { bookId, bookTitle, reviewText, rating } = req.body;
  try {
    const newReview = new Review({ bookId, bookTitle, reviewText, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Error creating review' });
  }
});

module.exports = router;
