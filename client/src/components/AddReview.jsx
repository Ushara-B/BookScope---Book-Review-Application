import React, { useState } from 'react';
import axios from '../axios/axiosConfig';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddReview = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    rating: '',
    reviewText: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reviews', formData);
      alert('Review added successfully!');
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add a New Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Book Title"
          name="bookTitle"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Author"
          name="author"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Rating (1-5)"
          name="rating"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
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
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Review
        </Button>
      </form>
    </Container>
  );
};

export default AddReview;
