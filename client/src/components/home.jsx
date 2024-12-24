import React, { useEffect, useState } from 'react';
import axios from "../axios/axiosConfig";

import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/reviews');
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.bookTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Reviews
      </Typography>
      <TextField
        label="Search by book title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={2}>
        {filteredReviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{review.bookTitle}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Author: {review.author}
                </Typography>
                <Typography variant="body1">Rating: {review.rating}</Typography>
                <Typography variant="body2">{review.reviewText}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1 }}
                  href={`/edit/${review._id}`}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
