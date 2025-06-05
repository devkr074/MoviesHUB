// src/pages/Movies.jsx
import React from 'react';
import Card from '../component/Card';

const Movies = ({ user }) => {
  const movies = [
    "Movie 1", "Movie 2", "Movie 3", "Movie 4",
    "Movie 5", "Movie 6", "Movie 7", "Movie 8",
    "Movie 9", "Movie 10"
  ];

  return (
    <div className="row">
      {movies.map((movie, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <Card title={movie} type="movie" user={user} />
        </div>
      ))}
    </div>
  );
};

export default Movies;
