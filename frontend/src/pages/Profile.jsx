// src/pages/Profile.jsx
import React, { useState } from 'react';

const Profile = ({ user, setUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: user ? user.username : '',
    email: user ? user.email : ''
  });
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Send updated details along with user id
        body: JSON.stringify({ ...form, id: user.id })
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);  // update user state with new details
        setMessage("Profile updated successfully.");
        setEditMode(false);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile.");
    }
  };

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {!editMode ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-secondary" onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
