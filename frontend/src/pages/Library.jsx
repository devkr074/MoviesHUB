// src/pages/Library.jsx
import React, { useEffect, useState } from 'react';

const Library = ({ user }) => {
  const [libraryItems, setLibraryItems] = useState([]);

  const fetchLibraryItems = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`http://localhost:8080/api/library/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setLibraryItems(data);
        } else {
          console.error("Failed to fetch library items");
        }
      } catch (error) {
        console.error("Error fetching library items:", error);
      }
    }
  };

  useEffect(() => {
    fetchLibraryItems();
  }, [user]);

  if (!user) {
    return <p>Please login to view your Library.</p>;
  }

  return (
    <div>
      <h2>Your Library</h2>
      {libraryItems.length === 0 ? (
        <p>No items added in your Library yet.</p>
      ) : (
        <ul>
          {libraryItems.map(item => (
            <li key={item.id}>
              {item.title} ({item.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Library;
