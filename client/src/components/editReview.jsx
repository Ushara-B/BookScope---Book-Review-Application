import React, { useState, useEffect } from 'react';
import axios from '../axios/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    bookTitle: '',
    author: '',
    rating: '',
    reviewText: ''
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(`/reviews/${id}`);
        setReview(data);
      } catch (err) {
        console.error('Error fetching review:', err);
      }
    };
    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/reviews/${id}`, review);
      navigate('/');
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, color: '#db0043' }}>Edit Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Book Title"
          variant="outlined"
          name="bookTitle"
          value={review.bookTitle}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          name="author"
          value={review.author}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Rating (1-5)"
          type="number"
          variant="outlined"
          name="rating"
          value={review.rating}
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
          value={review.reviewText}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff8000', "&:hover": { backgroundColor: '#ff5500' } }}>
          Update Review
        </Button>
      </form>
    </Container>
  );
};

export default EditReview;
