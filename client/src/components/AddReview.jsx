import React, { useState } from 'react';
import axios from '../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';

const AddReview = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    bookTitle: '',
    author: '',
    rating: '',
    reviewText: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/reviews', reviewData);
      navigate('/');
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, color: '#db0043' }}>Add a New Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Book Title"
          variant="outlined"
          name="bookTitle"
          value={reviewData.bookTitle}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          name="author"
          value={reviewData.author}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Rating (1-5)"
          type="number"
          variant="outlined"
          name="rating"
          value={reviewData.rating}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Review"
          variant="outlined"
          name="reviewText"
          multiline
          rows={4}
          value={reviewData.reviewText}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff8000', "&:hover": { backgroundColor: '#ff5500' } }}>
          Add Review
        </Button>
      </form>
    </Container>
  );
};

export default AddReview;
