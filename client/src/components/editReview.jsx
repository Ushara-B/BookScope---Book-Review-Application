import React, { useEffect, useState } from 'react';
import axios from '../axios/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const EditReview = () => {
  const { id } = useParams(); // Review ID
  const navigate = useNavigate();
  const [review, setReview] = useState({
    bookTitle: '',
    reviewText: '',
    rating: 0,
  });

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const response = await axios.get(`/api/reviews/${id}`);
      setReview(response.data);
    } catch (err) {
      console.error('Error fetching review:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/reviews/${id}`, review);
      navigate('/'); // Redirect to the homepage
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Book Title"
          name="bookTitle"
          variant="outlined"
          fullWidth
          margin="normal"
          value={review.bookTitle}
          disabled
        />
        <TextField
          label="Review Text"
          name="reviewText"
          variant="outlined"
          fullWidth
          margin="normal"
          value={review.reviewText}
          onChange={handleChange}
          required
        />
        <TextField
          label="Rating (1-5)"
          name="rating"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={review.rating}
          onChange={handleChange}
          inputProps={{ min: 1, max: 5 }}
          required
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditReview;
