import React, { useEffect, useState } from 'react';
import axios from '../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const AddReview = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books/search?query=programming'); // Replace 'programming' with your query
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', {
        bookId: selectedBook,
        bookTitle: books.find((book) => book.bookId === selectedBook)?.title,
        reviewText,
        rating,
      });
      navigate('/'); // Redirect to the homepage
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
        <Select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select a Book
          </MenuItem>
          {books.map((book) => (
            <MenuItem key={book.bookId} value={book.bookId}>
              {book.title}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Review Text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <TextField
          label="Rating (1-5)"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          inputProps={{ min: 1, max: 5 }}
          required
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Add Review
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddReview;
