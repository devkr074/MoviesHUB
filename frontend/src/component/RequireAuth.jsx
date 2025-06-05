// src/components/RequireAuth.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    // Agar user null hai, toh current location state ke sath login page par redirect karo.
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Agar user hai, toh bachche components render honge.
  return children;
};

export default RequireAuth;
