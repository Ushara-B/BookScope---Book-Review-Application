import React, { useState } from 'react';
import axios from '../axios/axiosConfig';
import { Container, TextField, Button, Grid, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get(`/api/books/search?query=${query}`);
      const topResults = response.data.slice(0, 5); // Get the first 5 results
      setBooks(topResults); // Update books state with the top 5 results
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <Container sx={{ backgroundColor: '#f0e0d6', padding: '20px', minHeight: '100vh', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#db0043', mb: 4 }}>
        Search for Books
      </Typography>
      <TextField
        label="Search Google Books"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={searchBooks}
        sx={{ backgroundColor: '#db0043', color: '#fff', mb: 4 }}
      >
        Search
      </Button>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.bookId}>
            <Card sx={{ minHeight: 350, borderRadius: '8px' }}>
              <CardMedia
                component="img"
                height="200"
                image={book.thumbnail || 'https://via.placeholder.com/150'}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2">
                  {book.authors ? book.authors.join(', ') : 'No authors available'}
                </Typography>
                <Typography variant="body2">
                  {book.description?.substring(0, 100) || 'No description available'}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {books.length === 0 && query && (
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', color: '#db0043' }}>
          No results found. Please try a different search term.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
