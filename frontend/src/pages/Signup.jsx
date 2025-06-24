import React, { useState, useEffect, useRef } from 'react';

// Importing icons from lucide-react (assuming it's available in the environment)
// Fallback to inline SVG if lucide-react is not directly supported in the environment
const User = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const Mail = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const Lock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Eye = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOff = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.06 18.06 0 0 1 5.34-5.34M14.12 14.12a3 3 0 1 0-4.24-4.24"/><path d="M14.12 14.12 10 10"/><path d="m2 2 20 20"/></svg>;
const Hash = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="10" y1="3" y2="21"/><line x1="14" x2="14" y1="3" y2="21"/></svg>;


// Popover Component for displaying messages
const Popover = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Show popover with a slight delay for animation
    const showTimeout = setTimeout(() => setIsVisible(true), 50);

    // Hide popover after 5 seconds
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      // Remove from DOM after transition
      setTimeout(onClose, 500); // 500ms matches transition duration
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


// Main Signup functional component
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerIntervalRef = useRef(null);
  const [popover, setPopover] = useState(null);
  const showPopover = (message, type) => {
    setPopover({ message, type });
  };
  const clearPopover = () => {
    setPopover(null);
  };
  useEffect(() => {
    if (timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timeLeft]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
    if (name === 'confirmPassword' && formData.password && value !== formData.password) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
    } else if (name === 'confirmPassword' && formData.password && value === formData.password) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
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
    if (name === 'password' || name === 'confirmPassword') {
      if (formData.password !== formData.confirmPassword && formData.confirmPassword !== '') {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
      } else if (formData.password === formData.confirmPassword && formData.confirmPassword !== '') {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
      }
    }
  };
  const validateField = async (name, value) => {
    let error = '';
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required.';
        }
        break;
      case 'gender':
        if (!value.trim()) {
          error = 'Gender is required.';
        }
        break;
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
        if (!value.trim()) {
          error = 'Please enter the verification code.';
        } else if (value.trim().length !== 6 || !/^\d+$/.test(value)) {
          error = 'OTP must be a 6-digit number.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error;
  };
  const validateForm = async () => {
    const newErrors = {};
    const fieldsToValidate = ['name', 'gender', 'username', 'email', 'password', 'confirmPassword', 'otp'];
    for (const field of fieldsToValidate) {
      const error = await validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleGetOtp = async () => {
    setIsSendingOtp(true);
    const fieldsToValidateBeforeOtp = ['email'];
    let hasError = false;
    const currentErrors = {};
    for (const field of fieldsToValidateBeforeOtp) {
      const error = await validateField(field, formData[field]);
      if (error) {
        currentErrors[field] = error;
        hasError = true;
      }
    }
    setErrors(prevErrors => ({ ...prevErrors, ...currentErrors }));

    if (hasError) {
      setIsSendingOtp(false);
      showPopover('Please correct the highlighted errors before sending OTP.', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          gender: formData.gender,
          username: formData.username,
          email: formData.email,
          password: formData.password // Password is sent to backend for OTP stage, but not stored unless verified
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setTimeLeft(59); // Start 59-second timer
        showPopover(data.message, 'success');
      } else {
        showPopover(data.message || 'Failed to send OTP. Please try again.', 'error');
      }
    } catch (error) {
      showPopover('Network error: Could not connect to the server.', 'error');
      console.error('OTP sending error:', error);
    } finally {
      setIsSendingOtp(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const isValid = await validateForm();

    if (isValid) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            gender: formData.gender,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            otpCode: formData.otp
          }),
        });

        const data = await response.json();

        if (response.ok) {
          showPopover(data.message, 'success');
          setSubmitSuccess(true);
          setFormData({
            name: '',
            gender: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            otp: ''
          });
          setOtpSent(false);
          setErrors({});
        } else {
          showPopover(data.message || 'Registration failed. Please try again.', 'error');
        }
      } catch (error) {
        showPopover('Network error: Could not connect to the server.', 'error');
        console.error('Signup error:', error);
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
    // Determine if the input needs right padding for the eye icon
    const hasEyeIcon = fieldName === 'password' || fieldName === 'confirmPassword';
    const paddingClass = hasEyeIcon ? 'pr-10' : '';
    return `w-full p-3 pl-10 ${paddingClass} border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out
            ${errors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`;
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      {popover && (
        <Popover message={popover.message} type={popover.type} onClose={clearPopover}/>
      )}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">Signup successful! Welcome aboard.</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('name').replace('pr-10', '')} placeholder="Name" />
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.name ? 'opacity-100' : 'opacity-0'}`}>{errors.name || ' '}</p>
          </div>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('gender').replace('pr-10', '')}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.gender ? 'opacity-100' : 'opacity-0'}`}>{errors.gender || ' '}</p>
          </div>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('username').replace('pr-10', '')} placeholder="Username" />
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.username ? 'opacity-100' : 'opacity-0'}`}>{errors.username || ' '}</p>
          </div>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('email').replace('pr-10', '')} placeholder="Email address" />
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>{errors.email || ' '}</p>
          </div>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('password')} placeholder="Password"/>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</span>
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.password ? 'opacity-100' : 'opacity-0'}`}>{errors.password || ' '}</p>
          </div>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('confirmPassword')} placeholder="Confirm password"/>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</span>
            </div>
            <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.confirmPassword ? 'opacity-100' : 'opacity-0'}`}>{errors.confirmPassword || ' '}</p>
          </div>
          <div className="mb-6 flex items-start gap-3">
            <div className="flex-grow relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Hash className="w-5 h-5" />
              </span>
              <input type="text" id="otp" name="otp" value={formData.otp} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={getInputClasses('otp').replace('pr-10', '')} placeholder="Code" />
              <p className={`text-sm text-red-500 mt-1 min-h-[1.25rem] transition-opacity duration-300 ${errors.otp ? 'opacity-100' : 'opacity-0'}`}>{errors.otp || ' '}</p>
            </div>
            <button type="button" onClick={handleGetOtp} disabled={isSendingOtp || timeLeft > 0} className="mt-0.5 self-start px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">{isSendingOtp ? 'Sending...' : timeLeft > 0 ? `Resend code in ${timeLeft}s` : 'Send code'}
            </button>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? 'Signing up...' : 'Sign up'}</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;