import React, { useState } from "react";
import axios from "axios";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/search?query=${query}`);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Movie search failed!");
    }
  };

  const handleAddFavorite = async (movie) => {
    const userId = localStorage.getItem("userId") || "defaultUser";
    const favoriteData = {
      userId,
      movieId: movie.id || "NA",
      title: movie.title,
      description: movie.description,
      posterUrl: movie.posterUrl || "https://via.placeholder.com/150",
    };

    try {
      await axios.post(`http://localhost:8080/api/favorites/add`, favoriteData);
      alert("Movie added to favorites!");
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Failed to add favorite!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter movie name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <div className="mt-4">
        {movies.map((movie, index) => (
          <div key={index} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/150"}
                  className="img-fluid rounded-start"
                  alt={movie.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleAddFavorite(movie)}
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
