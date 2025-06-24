import React, { useState, useEffect, useRef } from 'react';

const Signup = () => {
  // State to toggle between signup and login forms
  const [isSignupForm, setIsSignupForm] = useState(true);

  // --- Signup Form States ---
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupCode, setSignupCode] = useState('');

  // Signup form validation messages
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [signupConfirmPasswordError, setSignupConfirmPasswordError] = useState('');
  const [signupCodeError, setSignupCodeError] = useState('');
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  // OTP related states for Signup
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Countdown in seconds for resend
  const [otpExpiryTimer, setOtpExpiryTimer] = useState(120); // Countdown in seconds for OTP expiry (2 minutes)
  const resendIntervalRef = useRef(null);
  const otpExpiryIntervalRef = useRef(null);

  // --- Login Form States ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');


  // Base URL for your Spring Boot backend (adjust if different)
  const API_BASE_URL = 'http://localhost:8080/api/users'; // Assuming backend runs on 8080

  // --- Common Validation Functions ---
  const validateEmail = (emailToValidate, setEmailErrorFunc) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailToValidate) {
      setEmailErrorFunc('Email address is required.');
      return false;
    } else if (!emailRegex.test(emailToValidate)) {
      setEmailErrorFunc('Please enter a valid email address.');
      return false;
    }
    setEmailErrorFunc('');
    return true;
  };

  // --- Signup Form Handlers and Logic ---
  const handleGetCode = async () => {
    setSignupSuccessMessage('');
    setSignupErrorMessage('');
    setSignupEmailError(''); // Clear email error before sending

    if (!validateEmail(signupEmail, setSignupEmailError)) {
      return; // Stop if email is not valid
    }

    if (resendTimer > 0) {
      setSignupErrorMessage(`Please wait ${resendTimer} seconds before requesting another OTP.`);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupSuccessMessage(data.message || 'Verification code sent to your email.');
        setOtpSent(true);
        setResendTimer(60); // 1 minute cooldown for resend
        setOtpExpiryTimer(120); // 2 minute OTP validity

        // Clear any existing intervals before starting new ones
        if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);
        if (otpExpiryIntervalRef.current) clearInterval(otpExpiryIntervalRef.current);

        // Start countdown intervals
        resendIntervalRef.current = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(resendIntervalRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        otpExpiryIntervalRef.current = setInterval(() => {
          setOtpExpiryTimer((prev) => {
            if (prev <= 1) {
              clearInterval(otpExpiryIntervalRef.current);
              setSignupSuccessMessage(''); // Clear success message if OTP expires
              setSignupErrorMessage('Your OTP has expired. Please request a new one.');
              // setOtpSent(false); // Do not reset otpSent here to allow resend
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

      } else {
        setSignupErrorMessage(data.message || 'Failed to send verification code.');
        // If sending failed, ensure timers and button state are reset if they were started
        if (!response.ok) {
             clearInterval(resendIntervalRef.current);
             clearInterval(otpExpiryIntervalRef.current);
             setOtpSent(false); // Reset otpSent if the request failed
             setResendTimer(0);
             setOtpExpiryTimer(120); // Reset for next attempt
        }
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setSignupErrorMessage('Network error or server unavailable. Please try again.');
      clearInterval(resendIntervalRef.current);
      clearInterval(otpExpiryIntervalRef.current);
      setOtpSent(false);
      setResendTimer(0);
      setOtpExpiryTimer(120); // Reset for next attempt
    }
  };

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      if (resendIntervalRef.current) {
        clearInterval(resendIntervalRef.current);
      }
      if (otpExpiryIntervalRef.current) {
        clearInterval(otpExpiryIntervalRef.current);
      }
    };
  }, []);

  const validateSignupForm = () => {
    let isValid = true;

    if (!validateEmail(signupEmail, setSignupEmailError)) {
      isValid = false;
    }

    if (!signupPassword) {
      setSignupPasswordError('Password is required.');
      isValid = false;
    } else if (signupPassword.length < 8) {
      setSignupPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setSignupPasswordError('');
    }

    if (!signupConfirmPassword) {
      setSignupConfirmPasswordError('Confirm password is required.');
      isValid = false;
    } else if (signupPassword !== signupConfirmPassword) {
      setSignupConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setSignupConfirmPasswordError('');
    }

    if (!signupCode) {
      setSignupCodeError('Verification code is required.');
      isValid = false;
    } else {
      setSignupCodeError('');
    }

    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignupSuccessMessage('');
    setSignupErrorMessage('');

    if (!validateSignupForm()) {
      setSignupErrorMessage('Please correct the errors in the form.');
      return;
    }

    if (!otpSent || otpExpiryTimer <= 0) {
      setSignupErrorMessage('Please request and verify an OTP first, or your OTP might have expired.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, password: signupPassword, otp: signupCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupSuccessMessage(data.message || 'Account created successfully!');
        // Clear all fields and reset state on successful signup
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setSignupCode('');
        setOtpSent(false);
        setResendTimer(0);
        setOtpExpiryTimer(120);
        clearInterval(resendIntervalRef.current);
        clearInterval(otpExpiryIntervalRef.current);
      } else {
        setSignupErrorMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupErrorMessage('Network error or server unavailable. Please try again.');
    }
  };

  const getCodeButtonText = () => {
    if (resendTimer > 0) {
      return `Resend in ${resendTimer}s`;
    }
    return 'Get Code';
  };

  // --- Login Form Handlers and Logic ---
  const validateLoginForm = () => {
    let isValid = true;

    if (!validateEmail(loginEmail, setLoginEmailError)) {
      isValid = false;
    }
    if (!loginPassword) {
      setLoginPasswordError('Password is required.');
      isValid = false;
    } else {
      setLoginPasswordError('');
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginSuccessMessage('');
    setLoginErrorMessage('');

    if (!validateLoginForm()) {
      setLoginErrorMessage('Please correct the errors in the form.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginSuccessMessage(data.message || 'Login successful!');
        setLoginEmail('');
        setLoginPassword('');
        // In a real app, you'd handle authentication tokens here (e.g., store in localStorage/cookies)
        console.log('Login successful! Welcome user.');
      } else {
        setLoginErrorMessage(data.message || 'Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginErrorMessage('Network error or server unavailable. Please try again.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsSignupForm(true)}
            className={`px-4 py-2 rounded-l-lg font-semibold transition duration-200 ease-in-out
              ${isSignupForm ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignupForm(false)}
            className={`px-4 py-2 rounded-r-lg font-semibold transition duration-200 ease-in-out
              ${!isSignupForm ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Login
          </button>
        </div>

        {isSignupForm ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
            <form onSubmit={handleSignUp} noValidate>
              {/* Email Address Input (Signup) */}
              <div className="mb-5">
                <label htmlFor="signupEmail" className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="signupEmail"
                  className={`w-full px-4 py-2 border ${
                    signupEmailError ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  onBlur={() => validateEmail(signupEmail, setSignupEmailError)}
                  onFocus={() => setSignupEmailError('')}
                  disabled={otpSent && resendTimer > 0 && resendTimer < 60}
                />
                <p className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${signupEmailError ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {signupEmailError}
                </p>
              </div>

              {/* Password Input (Signup) */}
              <div className="mb-5">
                <label htmlFor="signupPassword" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="signupPassword"
                  className={`w-full px-4 py-2 border ${
                    signupPasswordError ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Minimum 8 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  onBlur={() => {
                    if (!signupPassword) {
                      setSignupPasswordError('Password is required.');
                    } else if (signupPassword.length < 8) {
                      setSignupPasswordError('Password must be at least 8 characters long.');
                    } else {
                      setSignupPasswordError('');
                    }
                  }}
                  onFocus={() => setSignupPasswordError('')}
                />
                <p className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${signupPasswordError ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {signupPasswordError}
                </p>
              </div>

              {/* Confirm Password Input (Signup) */}
              <div className="mb-5">
                <label htmlFor="signupConfirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="signupConfirmPassword"
                  className={`w-full px-4 py-2 border ${
                    signupConfirmPasswordError ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Confirm your password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  onBlur={() => {
                    if (!signupConfirmPassword) {
                      setSignupConfirmPasswordError('Confirm password is required.');
                    } else if (signupPassword !== signupConfirmPassword) {
                      setSignupConfirmPasswordError('Passwords do not match.');
                    } else {
                      setSignupConfirmPasswordError('');
                    }
                  }}
                  onFocus={() => setSignupConfirmPasswordError('')}
                />
                <p className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${signupConfirmPasswordError ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {signupConfirmPasswordError}
                </p>
              </div>

              {/* Code Input with Get Code Button (Signup) */}
              <div className="mb-6">
                <label htmlFor="signupCode" className="block text-gray-700 text-sm font-medium mb-2">
                  Verification Code
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    id="signupCode"
                    className={`flex-grow px-4 py-2 border ${
                      signupCodeError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter verification code"
                    value={signupCode}
                    onChange={(e) => setSignupCode(e.target.value)}
                    onBlur={() => {
                      if (!signupCode && otpSent) {
                        setSignupCodeError('Verification code is required.');
                      } else {
                        setSignupCodeError('');
                      }
                    }}
                    onFocus={() => setSignupCodeError('')}
                    disabled={!otpSent && otpExpiryTimer === 120}
                  />
                  <button
                    type="button"
                    onClick={handleGetCode}
                    className={`px-6 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out
                      ${resendTimer > 0
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                      }`}
                    disabled={resendTimer > 0}
                  >
                    {getCodeButtonText()}
                  </button>
                </div>
                <p className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${signupCodeError ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {signupCodeError}
                </p>
                {otpSent && otpExpiryTimer > 0 && (
                  <p className="text-gray-600 text-xs mt-1 transition-all duration-300 ease-in-out opacity-100">
                    OTP valid for {Math.floor(otpExpiryTimer / 60)}m {otpExpiryTimer % 60}s
                  </p>
                )}
              </div>

              {signupErrorMessage && (
                <p className="text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center mb-4 border border-red-200 transition-all duration-300 ease-in-out opacity-100">
                  {signupErrorMessage}
                </p>
              )}
              {signupSuccessMessage && (
                <p className="text-green-600 bg-green-100 p-3 rounded-lg text-sm text-center mb-4 border border-green-200 transition-all duration-300 ease-in-out opacity-100">
                  {signupSuccessMessage}
                </p>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
              >
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
            <form onSubmit={handleLogin} noValidate>
              {/* Email Address Input (Login) */}
              <div className="mb-5">
                <label htmlFor="loginEmail" className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  className={`w-full px-4 py-2 border ${
                    loginEmailError ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  onBlur={() => validateEmail(loginEmail, setLoginEmailError)}
                  onFocus={() => setLoginEmailError('')}
                />
                <p className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${loginEmailError ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {loginEmailError}
                </p>
              </div>

              {/* Password Input (Login) */}
              <div className="mb-6">
                <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  className={`w-full px-4 py-2 border ${
                    loginPasswordError ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onBlur={() => {
                    if (!loginPassword) {
                      setLoginPasswordError('Password is required.');
                    } else {
                      setLoginPasswordError('');
                    }
                  }}
                  onFocus={() => setLoginPasswordError('')}
                />
                <p className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${loginPasswordError ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {loginPasswordError}
                </p>
              </div>

              {loginErrorMessage && (
                <p className="text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center mb-4 border border-red-200 transition-all duration-300 ease-in-out opacity-100">
                  {loginErrorMessage}
                </p>
              )}
              {loginSuccessMessage && (
                <p className="text-green-600 bg-green-100 p-3 rounded-lg text-sm text-center mb-4 border border-green-200 transition-all duration-300 ease-in-out opacity-100">
                  {loginSuccessMessage}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
              >
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
