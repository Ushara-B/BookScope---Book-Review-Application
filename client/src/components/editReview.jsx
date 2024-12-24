import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    rating: '',
    reviewText: '',
  });

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const response = await axios.get(`/reviews/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.error('Error fetching review:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/reviews/${id}`, formData);
      alert('Review updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating review:', err);
    }
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
          value={formData.bookTitle}
          onChange={handleChange}
        />
        <TextField
          label="Author"
          name="author"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.author}
          onChange={handleChange}
        />
        <TextField
          label="Rating (1-5)"
          name="rating"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={formData.rating}
          onChange={handleChange}
        />
        <TextField
          label="Review"
          name="reviewText"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.reviewText}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Review
        </Button>
      </form>
    </Container>
  );
};

export default EditReview;
