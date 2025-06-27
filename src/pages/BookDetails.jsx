import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams(); // OLxxxxW
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(res.data);

        const favs = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favs.some((b) => b.id === id));
      } catch (err) {
        console.error('Error loading book details', err);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = favs.filter((b) => b.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const newBook = {
        id,
        title: book.title,
        description:
          book.description?.value || book.description || 'No description available.',
      };
      favs.push(newBook);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  if (!book) return <p className="loading">Loading...</p>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>

      <p className="description">
        {book.description?.value || book.description || 'No description available.'}
      </p>

      {book.subjects && (
        <div className="subjects">
          <strong>Subjects:</strong> {book.subjects.slice(0, 5).join(', ')}
        </div>
      )}

      <button className={`fav-btn ${isFavorite ? 'remove' : 'add'}`} onClick={toggleFavorite}>
        {isFavorite ? '💔 Remove from Favorites' : '❤️ Add to Favorites'}
      </button>
    </div>
  );
};

export default BookDetails;
