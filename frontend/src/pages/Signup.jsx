// src/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        otp: '',
    });

    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
        setMessage('');
    };

    const validateFormForGetOtp = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
            isValid = false;
        }
        // For 'Get OTP' button, we need username, password, confirmPassword too if it's the initial request
        if (!otpSent) { // Only validate these for initial 'Get OTP' (which triggers /register)
            if (!formData.username) {
                newErrors.username = 'Username is required';
                isValid = false;
            }
            if (!formData.password) {
                newErrors.password = 'Password is required';
                isValid = false;
            } else if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters long';
                isValid = false;
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Confirm password is required';
                isValid = false;
            } else if (formData.confirmPassword !== formData.password) {
                newErrors.confirmPassword = 'Passwords do not match';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleGetOtp = async () => {
        // Validate all required fields for the initial signup
        if (!validateFormForGetOtp()) {
            setMessage('Please fill in all required fields correctly to get OTP.');
            return;
        }

        try {
            if (!otpSent) {
                // Initial "Get OTP" click, sends all signup data to /register
                const response = await axios.post('http://localhost:8080/api/auth/register', {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                });
                setMessage(response.data);
                setOtpSent(true);
                alert('OTP sent to your email!');
            } else {
                // "Resend OTP" click, only sends email to /send-otp
                const response = await axios.post('http://localhost:8080/api/auth/send-otp', {
                    email: formData.email
                });
                setMessage(response.data);
                alert('OTP re-sent to your email!');
            }
        } catch (error) {
            console.error('Error in Get/Resend OTP:', error.response ? error.response.data : error.message);
            setMessage(error.response ? error.response.data : 'Error processing OTP request. Please try again.');
            setErrors({ general: error.response ? error.response.data : 'Error in OTP request' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform final validation including OTP before submission
        let formIsValid = true;
        let finalErrors = {};

        if (!formData.email) { finalErrors.email = 'Email is required'; formIsValid = false; }
        if (!formData.username) { finalErrors.username = 'Username is required'; formIsValid = false; }
        if (!formData.password) { finalErrors.password = 'Password is required'; formIsValid = false; }
        if (!formData.confirmPassword) { finalErrors.confirmPassword = 'Confirm password is required'; formIsValid = false; }
        if (formData.password !== formData.confirmPassword) { finalErrors.confirmPassword = 'Passwords do not match'; formIsValid = false; }
        if (!otpSent) { finalErrors.general = 'Please get OTP first.'; formIsValid = false; }
        if (otpSent && !formData.otp) { finalErrors.otp = 'OTP is required'; formIsValid = false; }


        setErrors(finalErrors);
        if (!formIsValid) {
            setMessage('Please correct the errors in the form.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/verify-otp', {
                email: formData.email,
                otp: formData.otp,
            });
            setMessage(response.data);
            alert('Signup Successful! Redirecting to home page...');
            navigate('/home');
        } catch (error) {
            console.error('Error verifying OTP or during signup:', error.response ? error.response.data : error.message);
            setMessage(error.response ? error.response.data : 'Signup failed. Please check your OTP and try again.');
            setErrors({ general: error.response ? error.response.data : 'Signup failed' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-white text-2xl font-bold mb-4">Sign Up</h2>

            {message && <p className="text-white bg-blue-500 p-2 rounded">{message}</p>}
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-2 border-white text-white bg-gray-700 p-2 rounded"
                value={formData.email}
                onChange={handleChange}
                required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
                type="text"
                name="username"
                placeholder="Username"
                className="border border-2 border-white text-white bg-gray-700 p-2 rounded"
                value={formData.username}
                onChange={handleChange}
                required
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

            <input
                type="password"
                name="password"
                placeholder="Password"
                className="border border-2 border-white text-white bg-gray-700 p-2 rounded"
                value={formData.password}
                onChange={handleChange}
                required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border border-2 border-white text-white bg-gray-700 p-2 rounded"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    className="flex-grow border border-2 border-white text-white bg-gray-700 p-2 rounded"
                    value={formData.otp}
                    onChange={handleChange}
                    disabled={!otpSent}
                    required={otpSent}
                />
                <button
                    type="button"
                    className={`px-4 py-2 rounded ${
                        (formData.email && formData.username && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && !errors.email && !errors.username && !errors.password && !errors.confirmPassword)
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-500 cursor-not-allowed text-gray-300'
                    }`}
                    onClick={handleGetOtp}
                    disabled={
                        !(formData.email && formData.username && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) ||
                        !!errors.email || !!errors.username || !!errors.password || !!errors.confirmPassword
                    }
                >
                    {otpSent ? 'Resend OTP' : 'Get OTP'}
                </button>
            </div>
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

            <button
                type="submit"
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 ${!otpSent || !formData.otp ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!otpSent || !formData.otp}
            >
                Signup
            </button>
        </form>
    );
}

export default Signup;