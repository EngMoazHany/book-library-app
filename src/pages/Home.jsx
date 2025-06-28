import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('AI');

  // ✅ دالة البحث
  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  // ✅ تحميل الكتب من API
  const fetchBooks = async (searchQuery) => {
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}`);
      setBooks(res.data.docs.slice(0, 12));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // ✅ تنفيذ مرة واحدة عند تحميل الصفحة
  useEffect(() => {
    fetchBooks(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
