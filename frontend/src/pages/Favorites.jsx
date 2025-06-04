// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`http://localhost:8080/api/favorites/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  if (!user) {
    return <p>Please login to view your Favorites.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Movies/Shows</h2>
      {favorites.length === 0 ? (
        <p>No favorite items added yet.</p>
      ) : (
        <ul>
          {favorites.map(item => (
            <li key={item.id}>
              {item.title} ({item.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
