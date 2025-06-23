import React, { useState, useEffect } from 'react'; // Removed useRef

// Importing icons from lucide-react (assuming it's available in the environment)
// Fallback to inline SVG if lucide-react is not directly supported in the environment
const User = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const Mail = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const Lock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Eye = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOff = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.06 18.06 0 0 1 5.34-5.34M14.12 14.12a3 3 0 1 0-4.24-4.24"/><path d="M14.12 14.12 10 10"/><path d="m2 2 20 20"/></svg>;
const Hash = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="10" y1="3" y2="21"/><line x1="14" x2="14" y1="3" y2="21"/></svg>;


// Main Signup functional component
const Signup = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '', // Added username
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // State to hold validation errors for each field
  const [errors, setErrors] = useState({});

  // State to manage OTP sending status and message
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // State to manage overall form submission success
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  /**
   * Handles changes to input fields.
   * Updates formData and clears errors for the changed field.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    // Clear the error for this field immediately on change
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
    // Specific handling for confirmPassword: re-validate password if confirmPassword changes
    if (name === 'confirmPassword' && formData.password && value !== formData.password) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
    } else if (name === 'confirmPassword' && formData.password && value === formData.password) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
    }
  };

  /**
   * Handles focus event on input fields.
   * Clears the error message for the focused field.
   * @param {Object} e - The event object.
   */
  const handleFocus = (e) => {
    const { name } = e.target;
    // Clear the error for this field when focused
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  /**
   * Handles blur event on input fields.
   * Re-validates the field on blur to display errors as the user moves away.
   * Also, hides error if the field is unfocused and empty.
   * @param {Object} e - The event object.
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      // If unfocused and empty, clear the error for this field
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    } else {
      // Otherwise, validate the field normally
      validateField(name, value);
    }
    // Special case for password and confirmPassword to ensure consistency
    if (name === 'password' || name === 'confirmPassword') {
      if (formData.password !== formData.confirmPassword && formData.confirmPassword !== '') {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
      } else if (formData.password === formData.confirmPassword && formData.confirmPassword !== '') {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
      }
    }
  };

  /**
   * Validates a single form field.
   * @param {string} name - The name of the field.
   * @param {string} value - The current value of the field.
   */
  const validateField = async (name, value) => {
    let error = '';
    // Regex for username: alphanumeric, 3-20 characters, no leading/trailing spaces
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    // Regex for password: at least 6 characters, at least one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;


    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Username is required.';
        } else if (!usernameRegex.test(value)) {
          error = 'Username must be 3-20 alphanumeric characters.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Please enter your email address.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email address is invalid.';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Please enter your password.';
        } else if (!passwordRegex.test(value)) {
          error = 'Password must be at least 6 chars, with uppercase, lowercase, number, and symbol.';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please re-enter your password for confirmation.';
        } else if (value !== formData.password) {
          error = 'Passwords do not match.';
        }
        break;
      case 'otp':
        // OTP field is required always for form submission
        if (!value.trim()) {
          error = 'Please enter the verification code.';
        } else if (value.trim().length !== 6 || !/^\d+$/.test(value)) { // Assuming 6 digit numeric OTP
          error = 'OTP must be a 6-digit number.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error; // Return the error so it can be awaited by validateForm
  };

  /**
   * Validates all form fields.
   * @returns {Object} - An object containing validation errors.
   */
  const validateForm = async () => {
    const newErrors = {};
    const fieldsToValidate = ['username', 'email', 'password', 'confirmPassword', 'otp']; // OTP is now always validated on submit

    for (const field of fieldsToValidate) {
      const error = await validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  /**
   * Handles the "Send code" button click.
   * Validates email and simulates OTP sending.
   */
  const handleGetOtp = async () => {
    setIsSendingOtp(true);
    // Validate email first
    const emailError = await validateField('email', formData.email);

    if (emailError) {
      // The email input field's own error message will handle the display
      setIsSendingOtp(false);
      return;
    }

    try {
      // Simulate API call for sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate success or failure
      const success = Math.random() > 0.2; // 80% chance of success
      if (success) {
        setOtpSent(true); // Indicate OTP has been "sent"
        console.log('OTP sent successfully!');
      } else {
        console.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while sending OTP:', error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  /**
   * Handles the form submission (Sign Up button click).
   * Validates all fields and simulates signup process.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false); // Reset success message

    const isValid = await validateForm();

    if (isValid) {
      try {
        // Simulate API call for signup
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

        console.log('Signup successful:', formData);
        setSubmitSuccess(true);
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          otp: ''
        });
        setOtpSent(false); // Reset OTP state after successful signup
        setErrors({}); // Clear all errors
      } catch (error) {
        setErrors(prevErrors => ({ ...prevErrors, general: 'Signup failed. Please try again.' }));
        console.error('Signup error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      console.log('Form validation failed:', errors);
    }
  };

  // Helper function to get input classes based on error state
  const getInputClasses = (fieldName) => {
    return `w-full p-3 pl-10 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out
            ${errors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        {/* DeepSeek Logo and Description */}
        <div className="text-center mb-8">
          {/* Using a simple SVG for "deepseek" logo */}
          <svg className="w-32 h-auto mx-auto text-blue-600" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 20C60 8.9543 51.0457 0 40 0C28.9543 0 20 8.9543 20 20C20 31.0457 28.9543 40 40 40C51.0457 40 60 31.0457 60 20Z" fill="currentColor"/>
            <path d="M100 20C100 8.9543 91.0457 0 80 0C68.9543 0 60 8.9543 60 20C60 31.0457 68.9543 40 80 40C91.0457 40 100 31.0457 100 20Z" fill="currentColor"/>
            <path d="M140 20C140 8.9543 131.0457 0 120 0C108.9543 0 100 8.9543 100 20C100 31.0457 108.9543 40 120 40C131.0457 40 140 31.0457 140 20Z" fill="currentColor"/>
            <path d="M180 20C180 8.9543 171.0457 0 160 0C148.9543 0 140 8.9543 140 20C140 31.0457 148.9543 40 160 40C171.0457 40 180 31.0457 180 20Z" fill="currentColor"/>
            {/* Simple 'deepseek' text */}
            <text x="30" y="55" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#3B82F6">deepseek</text>
          </svg>
          <p className="text-gray-500 text-sm mt-4">
            Only email registration is supported in your region. One DeepSeek account is all you need to access to all DeepSeek services.
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            Signup successful! Welcome aboard.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username Field */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={getInputClasses('username')}
                placeholder="Username"
              />
            </div>
            {/* Added min-h-[1.25rem] to explicitly reserve space for the error message */}
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.username ? 'opacity-100' : 'opacity-0'}`}>
              {errors.username || ' '}
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={getInputClasses('email')}
                placeholder="Email address"
              />
            </div>
            {/* Added min-h-[1.25rem] to explicitly reserve space for the error message */}
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
              {errors.email || ' '}
            </p>
          </div>

          {/* Password Field */}
          <div className="mb-5">
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
            {/* Added min-h-[1.25rem] to explicitly reserve space for the error message */}
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
              {errors.password || ' '}
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={getInputClasses('confirmPassword')}
                placeholder="Confirm password"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
            </div>
            {/* Added min-h-[1.25rem] to explicitly reserve space for the error message */}
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.confirmPassword ? 'opacity-100' : 'opacity-0'}`}>
              {errors.confirmPassword || ' '}
            </p>
          </div>

          {/* OTP/Code Field and Send code Button */}
          <div className="mb-6 flex items-start gap-3">
            <div className="flex-grow relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Hash className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={getInputClasses('otp').replace('pr-10', '')} // OTP field doesn't need right padding for eye icon
                placeholder="Code"
              />
              {/* Added min-h-[1.25rem] to explicitly reserve space for the error message */}
              <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.otp ? 'opacity-100' : 'opacity-0'}`}>
                {errors.otp || ' '}
              </p>
            </div>
            <button
              type="button"
              onClick={handleGetOtp}
              disabled={isSendingOtp}
              className="mt-0.5 self-start px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSendingOtp ? 'Sending...' : 'Send code'}
            </button>
          </div>


          {/* Terms and Privacy Policy */}
          <p className="text-gray-500 text-xs text-center mb-6">
            By signing up, you consent to DeepSeek's{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>

          {/* Sign up Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
