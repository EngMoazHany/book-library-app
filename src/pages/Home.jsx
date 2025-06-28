import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('AI');

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const fetchBooks = async (searchQuery) => {
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}`);
      setBooks(res.data.docs.slice(0, 12));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks(query);
  }, []); // ✅ متسيبهاش فاضية عشان التحذير

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
