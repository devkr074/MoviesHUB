// src/pages/Shows.jsx
import React, { useState } from 'react';
import Card from '../components/Card';

const Shows = ({ user }) => {
  // Dummy list of shows
  const showsList = [
    "Breaking Bad",
    "Game of Thrones",
    "Stranger Things",
    "The Witcher",
    "The Mandalorian",
    "Sherlock",
    "Friends",
    "Better Call Saul",
    "The Wire",
    "Peaky Blinders"
  ];

  // State to hold search query
  const [query, setQuery] = useState("");

  // Filter the shows list based on the query
  const filteredShows = showsList.filter(show =>
    show.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Shows</h2>
      {/* Search bar */}
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search shows..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Display filtered shows */}
      <div className="row">
        {filteredShows.map((show, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card title={show} type="show" user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
