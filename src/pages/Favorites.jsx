import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-page">
      <h2>Your Favorite Books ❤️</h2>

      {favorites.length === 0 ? (
        <p className="no-fav">No favorite books yet. Start adding some!</p>
      ) : (
        <div className="fav-list">
          {favorites.map((book) => (
            <div key={book.id} className="fav-card">
              <h3>{book.title}</h3>
              <p>{book.description?.substring(0, 100)}...</p>
              <Link to={`/book/${book.id}`} className="view-btn">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
