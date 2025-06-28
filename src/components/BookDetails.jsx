import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(res.data);

        const favs = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favs.some((b) => b.id === id));
      } catch (err) {
        console.error('Error fetching book details:', err);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = favs.filter((b) => b.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const newBook = {
        id,
        title: book.title,
        description: book.description?.value || book.description || '',
      };
      favs.push(newBook);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{book.title}</h2>
      <p>{book.description?.value || book.description || 'No description available.'}</p>
      
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default BookDetails;
