import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch all reviews
    axios.get('http://localhost:5000/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Book Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <h2>{review.bookTitle}</h2>
            <p><strong>Author:</strong> {review.author}</p>
            <p><strong>Rating:</strong> {review.rating} / 5</p>
            <p><strong>Review:</strong> {review.reviewText}</p>
            <p><strong>Date Added:</strong> {new Date(review.dateAdded).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
