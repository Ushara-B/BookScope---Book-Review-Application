import React, { useEffect, useState } from 'react';
import axios from '../axios/axiosConfig';
import { Container, Typography, Card, CardContent, Grid, IconButton, Button, TextField, Select, MenuItem, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [sortOrder]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/reviews?sort=${sortOrder}`);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/reviews/${id}`);
      setReviews(reviews.filter(review => review._id !== id)); // Optimistically update the UI
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => index < rating ? <StarIcon key={index} style={{ color: '#f4f400' }}/> : <StarBorderIcon key={index} style={{ color: '#f4f400' }}/>);
  };

  return (
    <Container sx={{ backgroundColor: '#f0e0d6', padding: '20px', minHeight: '100vh', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#db0043', mb: 4 }}>
        Book Reviews
      </Typography>
      <TextField
        label="Search by book title"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        sx={{ mb: 2 }}
      />
      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        displayEmpty
        fullWidth
        variant="outlined"
        sx={{ mb: 4, backgroundColor: '#f4f400', color: 'black', borderRadius: '20px' }}
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="date">Sort by Date Updated</MenuItem>
        <MenuItem value="title">Sort Alphabetically</MenuItem>
      </Select>
      <Grid container spacing={2}>
        {reviews.filter(review => review.bookTitle.toLowerCase().includes(search)).map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Card sx={{ position: 'relative', minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '8px', backgroundColor: '#ff8000', padding: '10px' }}>
              <IconButton
                onClick={() => handleDelete(review._id)}
                sx={{ position: 'absolute', top: 8, right: 8, color: '#db0043' }}
                aria-label="delete review"
              >
                <DeleteIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h6">{review.bookTitle}</Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  {renderStars(review.rating)}
                </Box>
                <Typography variant="body2">{review.reviewText}</Typography>
              </CardContent>
              <Box textAlign="center" pb={2}>
                <Button href={`/edit/${review._id}`} sx={{ backgroundColor: '#8f0046', color: 'white', '&:hover': { backgroundColor: '#7a0037' }, borderRadius: '8px', textTransform: 'none', padding: '6px 12px' }}>
                  Edit
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
