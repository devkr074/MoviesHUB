// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './page/Home';
import Movies from './page/Movies';
import Shows from './page/Shows';
import Login from './page/Login';
import Signup from './page/Signup';
import Favorites from './page/Favorites';
import Library from './page/Library';
import Profile from './page/Profile';
import RequireAuth from './component/RequireAuth';

const App = () => {
  // Initialize user state from localStorage (if available)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies user={user} />} />
          <Route path="/shows" element={<Shows user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route
            path="/favorites"
            element={
              <RequireAuth user={user}>
                <Favorites user={user} />
              </RequireAuth>
            }
          />
          <Route
            path="/library"
            element={
              <RequireAuth user={user}>
                <Library user={user} />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth user={user}>
                <Profile user={user} setUser={setUser} />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
