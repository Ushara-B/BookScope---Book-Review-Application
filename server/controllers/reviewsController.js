const Review = require('../models/reviewsModel');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews', error: err });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating review', error: err });
  }
};

// Update an existing review
const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating review', error: err });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting review', error: err });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
};
