const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch books from Google Books API
router.get('/search', async (req, res) => {
  const { query } = req.query; // e.g., ?query=javascript
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    const books = response.data.items.map((item) => ({
      bookId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    }));

    res.json(books);
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

module.exports = router;
