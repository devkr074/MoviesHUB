import React, { useState, useRef, useEffect } from 'react';

// Importing icons from lucide-react (assuming it's available in the environment)
const User = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const Lock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Eye = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOff = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.06 18.06 0 0 1 5.34-5.34M14.12 14.12a3 3 0 1 0-4.24-4.24"/><path d="M14.12 14.12 10 10"/><path d="m2 2 20 20"/></svg>;


// Popover Component for displaying messages (reused from Signup)
const Popover = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const showTimeout = setTimeout(() => setIsVisible(true), 50);
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 5000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(timerRef.current);
    };
  }, [message, type, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const borderColor = type === 'success' ? 'border-green-700' : 'border-red-700';

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white font-semibold
                  ${bgColor} border ${borderColor} transition-all duration-500 ease-in-out z-50
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
    >
      {message}
    </div>
  );
};


// Login functional component
const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Can be username or email
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Popover message state
  const [popover, setPopover] = useState(null); // { message: '', type: 'success' | 'error' }

  /**
   * Displays a popover message.
   * @param {string} message - The message to display.
   * @param {'success' | 'error'} type - The type of message.
   */
  const showPopover = (message, type) => {
    setPopover({ message, type });
  };

  /**
   * Clears the popover message.
   */
  const clearPopover = () => {
    setPopover(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    } else {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'identifier':
        if (!value.trim()) {
          error = 'Username or Email is required.';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ['identifier', 'password'];

    for (const field of fieldsToValidate) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          showPopover(data.message, 'success');
          // Save user email to local storage upon successful login
          if (data.email) {
            localStorage.setItem('userEmail', data.email);
            console.log('User email saved to localStorage:', data.email);
          }
          // Optionally redirect user or update app state
          // For now, clear form
          setFormData({
            identifier: '',
            password: ''
          });
          setErrors({});
        } else {
          showPopover(data.message || 'Login failed. Please try again.', 'error');
        }
      } catch (error) {
        showPopover('Network error: Could not connect to the server.', 'error');
        console.error('Login error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      showPopover('Please correct the highlighted errors.', 'error');
      console.log('Form validation failed:', errors);
    }
  };

  const getInputClasses = (fieldName) => {
    const hasEyeIcon = fieldName === 'password';
    const paddingClass = hasEyeIcon ? 'pr-10' : '';

    return `w-full p-3 pl-10 ${paddingClass} border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out
            ${errors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      {popover && (
        <Popover
          message={popover.message}
          type={popover.type}
          onClose={clearPopover}
        />
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        {/* DeepSeek Logo and Description (reused from Signup) */}
        <div className="text-center mb-8">
          <svg className="w-32 h-auto mx-auto text-blue-600" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 20C60 8.9543 51.0457 0 40 0C28.9543 0 20 8.9543 20 20C20 31.0457 28.9543 40 40 40C51.0457 40 60 31.0457 60 20Z" fill="currentColor"/>
            <path d="M100 20C100 8.9543 91.0457 0 80 0C68.9543 0 60 8.9543 60 20C60 31.0457 68.9543 40 80 40C91.0457 40 100 31.0457 100 20Z" fill="currentColor"/>
            <path d="M140 20C140 8.9543 131.0457 0 120 0C108.9543 0 100 8.9543 100 20C100 31.0457 108.9543 40 120 40C131.0457 40 140 31.0457 140 20Z" fill="currentColor"/>
            <path d="M180 20C180 8.9543 171.0457 0 160 0C148.9543 0 140 8.9543 140 20C140 31.0457 148.9543 40 160 40C171.0457 40 180 31.0457 180 20Z" fill="currentColor"/>
            {/* Simple 'deepseek' text */}
            <text x="30" y="55" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#3B82F6">deepseek</text>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Login to your account</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username or Email Field */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={getInputClasses('identifier').replace('pr-10', '')}
                placeholder="Username or Email"
              />
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.identifier ? 'opacity-100' : 'opacity-0'}`}>
              {errors.identifier || ' '}
            </p>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={getInputClasses('password')}
                placeholder="Password"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
              {errors.password || ' '}
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline" onClick={() => console.log('Navigate to signup')}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
