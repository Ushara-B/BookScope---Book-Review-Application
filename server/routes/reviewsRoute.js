const express = require('express');
const router = express.Router();
const Review = require('../models/reviewsModel');

// Get all reviews
router.get('/', async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reviews', error: err });
    }
  });

router.post('/', async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json(newReview);
});

router.put('/:id', async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedReview);
});

router.delete('/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
