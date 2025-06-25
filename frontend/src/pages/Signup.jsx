import { useState, useEffect, useRef } from 'react';
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import signupBackground from "../assets/signupBackground.webp";
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [emailError, setEmailError] = useState('Email is required.');
  const [passwordError, setPasswordError] = useState('Password is required');
  const [confirmPasswordError, setConfirmPasswordError] = useState('Confirm password is required.');
  const [codeError, setCodeError] = useState('Code is required.');
  const [emailErrorStatus, setEmailErrorStatus] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);
  const [otpMessage, setOTPMessage] = useState('');
  const [otpMessageStatus, setOTPMessageStatus] = useState(false);
  const [otpError, setOTPError] = useState(false);


  const [isSignupForm, setIsSignupForm] = useState(true);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const [signupEmailError, setSignupEmailError] = useState(' ');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [signupConfirmPasswordError, setSignupConfirmPasswordError] = useState('');
  const [signupCodeError, setSignupCodeError] = useState('');
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpExpiryTimer, setOtpExpiryTimer] = useState(120);
  const resendIntervalRef = useRef(null);
  const otpExpiryIntervalRef = useRef(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const API_BASE_URL = 'http://localhost:8080/api/users';
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
  // const handleGetCode = async () => {
  //   setSignupSuccessMessage('');
  //   setSignupErrorMessage('');
  //   setSignupEmailError('');
  //   if (!validateEmail(signupEmail, setSignupEmailError)) {
  //     return;
  //   }
  //   if (resendTimer > 0) {
  //     setSignupErrorMessage(`Please wait ${resendTimer} seconds before requesting another OTP.`);
  //     return;
  //   }
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/send-otp`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email: signupEmail }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setSignupSuccessMessage(data.message || 'Verification code sent to your email.');
  //       setOtpSent(true);
  //       setResendTimer(60); // 1 minute cooldown for resend
  //       setOtpExpiryTimer(120); // 2 minute OTP validity

  //       // Clear any existing intervals before starting new ones
  //       if (resendIntervalRef.current) clearInterval(resendIntervalRef.current);
  //       if (otpExpiryIntervalRef.current) clearInterval(otpExpiryIntervalRef.current);

  //       // Start countdown intervals
  //       resendIntervalRef.current = setInterval(() => {
  //         setResendTimer((prev) => {
  //           if (prev <= 1) {
  //             clearInterval(resendIntervalRef.current);
  //             return 0;
  //           }
  //           return prev - 1;
  //         });
  //       }, 1000);

  //       otpExpiryIntervalRef.current = setInterval(() => {
  //         setOtpExpiryTimer((prev) => {
  //           if (prev <= 1) {
  //             clearInterval(otpExpiryIntervalRef.current);
  //             setSignupSuccessMessage(''); // Clear success message if OTP expires
  //             setSignupErrorMessage('Your OTP has expired. Please request a new one.');
  //             // setOtpSent(false); // Do not reset otpSent here to allow resend
  //             return 0;
  //           }
  //           return prev - 1;
  //         });
  //       }, 1000);

  //     } else {
  //       setSignupErrorMessage(data.message || 'Failed to send verification code.');
  //       // If sending failed, ensure timers and button state are reset if they were started
  //       if (!response.ok) {
  //         clearInterval(resendIntervalRef.current);
  //         clearInterval(otpExpiryIntervalRef.current);
  //         setOtpSent(false); // Reset otpSent if the request failed
  //         setResendTimer(0);
  //         setOtpExpiryTimer(120); // Reset for next attempt
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error sending OTP:', error);
  //     setSignupErrorMessage('Network error or server unavailable. Please try again.');
  //     clearInterval(resendIntervalRef.current);
  //     clearInterval(otpExpiryIntervalRef.current);
  //     setOtpSent(false);
  //     setResendTimer(0);
  //     setOtpExpiryTimer(120); // Reset for next attempt
  //   }
  // };

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

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   setSignupSuccessMessage('');
  //   setSignupErrorMessage('');

  //   if (!validateSignupForm()) {
  //     setSignupErrorMessage('Please correct the errors in the form.');
  //     return;
  //   }

  //   if (!otpSent || otpExpiryTimer <= 0) {
  //     setSignupErrorMessage('Please request and verify an OTP first, or your OTP might have expired.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/signup`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email: signupEmail, password: signupPassword, otp: signupCode }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setSignupSuccessMessage(data.message || 'Account created successfully!');
  //       // Clear all fields and reset state on successful signup
  //       setSignupEmail('');
  //       setSignupPassword('');
  //       setSignupConfirmPassword('');
  //       setSignupCode('');
  //       setOtpSent(false);
  //       setResendTimer(0);
  //       setOtpExpiryTimer(120);
  //       clearInterval(resendIntervalRef.current);
  //       clearInterval(otpExpiryIntervalRef.current);
  //     } else {
  //       setSignupErrorMessage(data.message || 'Registration failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error during signup:', error);
  //     setSignupErrorMessage('Network error or server unavailable. Please try again.');
  //   }
  // };

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



  function handleEmailChange(e) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(e.target.value);
    if (email == '') {
      setEmailError('Email is required');
    }
    else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid Email');
    }
    else {
      setEmailError('Correct Email');
    }
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);

  }
  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }
  function handleCodeChange(e) {
    setCode(e.target.value);
  }
  async function handleGetCode() {
    if (emailError != 'Correct Email') {
      setEmailErrorStatus(true);
      return;
    }
    try {
      setOTPLoading(true);
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOTPMessage(`Code sent to ${email}`);
        setOTPMessageStatus(true);
        setOTPError(false);
        setTimeout(() => {
          setOTPMessageStatus(false);
        }, 5000);
        setOTPLoading(false);
      } else {
        setOTPMessage(`Email already registered.`);
        setOTPMessageStatus(true);
        setOTPError(true);
        setTimeout(() => {
          setOTPMessageStatus(false);
        }, 5000);
        setOTPLoading(false);
      }
    } catch (error) {
      setOTPMessage(`Network error or Server unavilable.`);
      setOTPMessageStatus(true);
      setOTPError(true);
      setTimeout(() => {
        setOTPMessageStatus(false);
      }, 5000);
      setOTPLoading(false);
    }

  }
  function handleEmailFocus() {
    setEmailErrorStatus(false);
  }

  return (
    <div className='flex flex-col min-h-screen bg-center bg-cover items-center bg-fixed' style={{ backgroundImage: `url(${signupBackground})` }}>
      <span className={`text-white ${otpError ? "bg-red-500" : "bg-[#9F42C6]"} p-2 rounded rounded-lg transition ease-in-out duration-200 font-semibold absolute ${otpMessageStatus ? "translate-y-2" : "-translate-y-10"}`}>{otpMessage}</span>
      <p className="text-white p-8 text-center text-3xl font-bold">MoviesHUB</p>
      <form action="" className='border px-5 py-8 m-5 rounded rounded-lg bg-white border-white w-full lg:w-1/3'>
        <input value={email} onChange={handleEmailChange} type="text" placeholder='Email address' onFocus={handleEmailFocus} className={`border p-2 rounded rounded-md text-sm outline-none border border-2 border-black w-full focus:border-[#9F42C6] transition ease-in-out duration-200 ${emailErrorStatus ? "border-red-500" : "border-gray-300"}`} />
        <p className={`text-red-500 px-1 font-semibold text-sm pb-1 transition ease-in-out duration-200 ${emailErrorStatus ? "opacity-100" : "opacity-0"}`}>{emailError}</p>
        <input value={password} onChange={handlePasswordChange} type="password" placeholder='Password' className='border p-2 rounded rounded-md text-sm outline-none border border-2 border-gray-300 border-black w-full focus:border-[#9F42C6] transition ease-in-out duration-100' />
        <p className='text-red-500 px-2 font-semibold text-sm pb-1 opacity-0'>{passwordError}</p>
        <input value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" placeholder='Confirm password' className='border p-2 rounded rounded-md text-sm outline-none border border-2 border-gray-300 border-black w-full focus:border-[#9F42C6] transition ease-in-out duration-100' />
        <p className='text-red-500 px-2 font-semibold text-sm pb-1 opacity-0'>{confirmPasswordError}</p>
        <div className='flex'>
          <input value={code} onChange={handleCodeChange} type="password" placeholder='Code' className='flex-grow me-2 border p-2 rounded rounded-md text-sm outline-none border border-2 border-gray-300 border-black focus:border-[#9F42C6] transition ease-in-out duration-100' />
          <button onClick={handleGetCode} type='button' className='flex justify-center items-center font-semibold w-1/4 rounded rounded-md bg-[#9F42C6] cursor-pointer text-white transition ease-in-out duration-200 hover:opacity-90'>
            {
              otpLoading ?
                <ArrowPathIcon className='h-6 animate-spin' /> : "Send Code"
            }
          </button>
        </div>
        <p className='text-red-500 px-2 font-semibold text-sm pb-1 opacity-0'>{codeError}</p>
        <button className='bg-[#9F42C6] p-2 rounded rounded-md w-full text-white font-semibold hover:opacity-90 cursor-pointer transition ease-in-out duration-200'>Sign up</button>
      </form>
    </div>
  );
};
export default Signup;