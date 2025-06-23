import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: '', // Can be username or email
        password: '',
    });
    const [message, setMessage] = useState(''); // For success or error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setMessage(''); // Clear previous messages on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear message before new submission

        if (!formData.identifier || !formData.password) {
            setMessage('Please enter your username/email and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                identifier: formData.identifier,
                password: formData.password,
            });

            // On successful login, the backend returns the user's email
            const userEmail = response.data;
            localStorage.setItem('userEmail', userEmail); // Save email to local storage

            setMessage('Login successful! Redirecting to home...');
            alert('Login successful!'); // Use alert only for demo purposes; consider a custom modal
            navigate('/home'); // Redirect to home page
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setMessage(error.response ? error.response.data : 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-white text-2xl font-bold mb-4">Login</h2>

            {message && <p className={`p-2 rounded text-sm ${message.includes('success') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{message}</p>}

            <input
                type="text"
                name="identifier"
                placeholder="Username or Email"
                className="border border-2 border-white text-white bg-gray-700 p-2 rounded"
                value={formData.identifier}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="border border-2 border-white text-white bg-gray-700 p-2 rounded"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Login
            </button>
            <p className="text-gray-300 text-center text-sm">
                Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
            </p>
        </form>
    );
}

export default Login;