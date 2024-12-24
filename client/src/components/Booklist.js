import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('/api/books');
      setBooks(data.books);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {books.map(book => (
        <div key={book._id}>
          <img src={book.thumbnail} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
      
        </div>
      ))}
    </div>
  );
};

export default BookList;
