// src/components/CardComponent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, type, user }) => {
  const navigate = useNavigate();

  const handleAdd = async (actionType) => {
    if (!user) {
      alert('Please login to perform this action. Redirecting to Login.');
      navigate('/login');
      return;
    }

    // Construct payload with only required fields:
    const payload = {
      userId: user.id,  // ensure user has "id" field assigned from backend response
      title: title,
      type: type
    };

    // Determine endpoint based on actionType
    const url =
      actionType === "Library"
        ? 'http://localhost:8080/api/library/add'
        : 'http://localhost:8080/api/favorites/add';

    try {
      
        // Example in CardComponent.jsx
const response = await fetch(url, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(payload)
});

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(`${title} successfully added to ${actionType}`);
    } catch (error) {
      console.error('Error adding item:', error);
      alert(`Error adding ${title} to ${actionType}`);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <button 
          className="btn btn-primary me-2" 
          onClick={() => handleAdd('Library')}
        >
          Add to Library
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => handleAdd('Favorites')}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default Card;
