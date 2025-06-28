import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('AI');


  const fetchBooks = useCallback(async () => {
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      setBooks(res.data.docs.slice(0, 12));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, [query]); 

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={query}
          placeholder="Search books..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
