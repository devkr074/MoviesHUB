import React, { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("userId") || "defaultUser";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/favorites/user/${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemove = async (favoriteId) => {
    try {
      await axios.delete(`${backendUrl}/api/favorites/delete/${favoriteId}`);
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove favorite!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 && <p>No favorite movies added yet.</p>}
      {favorites.map((fav) => (
        <div key={fav.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={fav.posterUrl || "https://via.placeholder.com/150"}
                alt={fav.title}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{fav.title}</h5>
                <p className="card-text">{fav.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(fav.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
