import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  const id = book.key.replace('/works/', '');
  const title = book.title;
  const author = book.author_name?.[0] || 'Unknown Author';
  const coverId = book.cover_i;

  const coverImg = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://via.placeholder.com/150x220.png?text=No+Cover';

  return (
    <div className="book-card">
      <img src={coverImg} alt={title} className="book-cover" />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{author}</p>
        <Link to={`/book/${id}`} className="details-link">View Details</Link>
      </div>
    </div>
  );
};

export default BookCard;
