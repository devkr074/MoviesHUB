import { useState, useEffect, useRef } from 'react';
import signupBackground from "../assets/signupBackground.webp";
import loader from "../assets/loader.gif";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');

  const [emailError, setEmailError] = useState('Email is required.');
  const [passwordError, setPasswordError] = useState('Password is required.');
  const [confirmPasswordError, setConfirmPasswordError] = useState('Confirm password is required.');
  const [codeError, setCodeError] = useState('Code is required.');

  const [emailErrorStatus, setEmailErrorStatus] = useState(false);
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);
  const [confirmPasswordErrorStatus, setConfirmPasswordErrorStatus] = useState(false);
  const [codeErrorStatus, setCodeErrorStatus] = useState(false);

  const [otpLoading, setOTPLoading] = useState(false);
  const [otpMessage, setOTPMessage] = useState('');
  const [otpMessageStatus, setOTPMessageStatus] = useState(false);
  const [otpError, setOTPError] = useState(false);
  const [resendOTPTimer, setResendOTPTimer] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (resendOTPTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendOTPTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [resendOTPTimer]);

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (value === '') {
      setEmailError('Email is required.');
      setEmailErrorStatus(true);
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address.');
      setEmailErrorStatus(true);
    } else {
      setEmailError('Correct Email'); // This seems like a status indicator, not an error. Consider renaming.
      setEmailErrorStatus(false);
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    if (value === '') {
      setPasswordError('Password is required.');
      setPasswordErrorStatus(true);
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setPasswordErrorStatus(true);
    }
    else {
      setPasswordError('');
      setPasswordErrorStatus(false);
    }
  }

  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === '') {
      setConfirmPasswordError('Confirm password is required.');
      setConfirmPasswordErrorStatus(true);
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
      setConfirmPasswordErrorStatus(true);
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordErrorStatus(false);
    }
  }

  function handleCodeChange(e) {
    const value = e.target.value;
    setCode(value);
    if (value === '') {
      setCodeError('Code is required.');
      setCodeErrorStatus(true);
    } else if (value.length !== 6) { // Assuming OTP is 6 digits
      setCodeError('Code must be 6 digits.');
      setCodeErrorStatus(true);
    } else {
      setCodeError('');
      setCodeErrorStatus(false);
    }
  }

  async function handleGetCode() {
    if (emailErrorStatus || email === '') {
      setEmailErrorStatus(true);
      if (email === '') setEmailError('Email is required.');
      return;
    }

    try {
      setOTPLoading(true);
      const response = await fetch(`http://localhost:8080/api/users/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOTPMessage(`Code sent to ${email}`);
        setOTPMessageStatus(true);
        setOTPError(false);
        setResendOTPTimer(60);
        setTimeout(() => {
          setOTPMessageStatus(false);
        }, 5000);
      } else {
        setOTPMessage(data.message || `Email already registered.`);
        setOTPMessageStatus(true);
        setOTPError(true);
        setTimeout(() => {
          setOTPMessageStatus(false);
        }, 5000);
      }
    } catch (error) {
      setOTPMessage(`Network error or Server unavailable.`);
      setOTPMessageStatus(true);
      setOTPError(true);
      setTimeout(() => {
        setOTPMessageStatus(false);
      }, 5000);
    } finally {
      setOTPLoading(false);
    }
  }

  function handleEmailFocus() {
    setEmailErrorStatus(false);
  }

  function handlePasswordFocus() {
    setPasswordErrorStatus(false);
  }

  function handleConfirmPasswordFocus() {
    setConfirmPasswordErrorStatus(false);
  }

  function handleCodeFocus() {
    setCodeErrorStatus(false);
  }

  async function handleSignup(e) {
    e.preventDefault();

    // Trigger validation for all fields
    handleEmailChange({ target: { value: email } });
    handlePasswordChange({ target: { value: password } });
    handleConfirmPasswordChange({ target: { value: confirmPassword } });
    handleCodeChange({ target: { value: code } });

    // Check if any errors exist
    if (
      emailErrorStatus ||
      passwordErrorStatus ||
      confirmPasswordErrorStatus ||
      codeErrorStatus ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      code === '' ||
      password !== confirmPassword // Double-check password match
    ) {
      // If any errors, scroll to the first error or display a general message
      setOTPMessage('Please correct the errors in the form.');
      setOTPMessageStatus(true);
      setOTPError(true);
      setTimeout(() => {
        setOTPMessageStatus(false);
      }, 5000);
      return;
    }

    try {
      // Assuming a signup API endpoint
      const response = await fetch(`http://localhost:8080/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setOTPMessage('Signup successful! Redirecting...');
        setOTPMessageStatus(true);
        setOTPError(false);
        // Redirect or perform further actions upon successful signup
        // Example: setTimeout(() => navigate('/login'), 2000);
      } else {
        setOTPMessage(data.message || 'Signup failed. Please try again.');
        setOTPMessageStatus(true);
        setOTPError(true);
      }
      setTimeout(() => {
        setOTPMessageStatus(false);
      }, 5000);
    } catch (error) {
      setOTPMessage('Network error or Server unavailable during signup.');
      setOTPMessageStatus(true);
      setOTPError(true);
      setTimeout(() => {
        setOTPMessageStatus(false);
      }, 5000);
    }
  }

  return (
    <div className='flex flex-col min-h-screen bg-center bg-cover items-center bg-fixed' style={{ backgroundImage: `url(${signupBackground})` }}>
      <span className={`text-white ${otpError ? "bg-red-500" : "bg-[#9F42C6]"} p-2 rounded rounded-lg transition ease-in-out duration-200 font-semibold absolute ${otpMessageStatus ? "translate-y-2" : "-translate-y-10"}`}>{otpMessage}</span>
      <p className="text-white p-8 text-center text-3xl font-bold">MoviesHUB</p>
      <form onSubmit={handleSignup} className='border px-5 py-8 m-5 rounded rounded-lg bg-white border-white w-full lg:w-1/3'>
        <input
          value={email}
          onChange={handleEmailChange}
          type="text"
          placeholder='Email address'
          onFocus={handleEmailFocus}
          className={`border p-2 rounded rounded-md text-sm outline-none border border-2 w-full focus:border-[#9F42C6] transition ease-in-out duration-200 ${emailErrorStatus ? "border-red-500 bg-red-100" : "border-gray-300 bg-white"}`}
        />
        <p className={`text-red-500 px-1 text-sm pb-1 transition ease-in-out duration-200 ${emailErrorStatus ? "opacity-100" : "opacity-0"}`}>{emailError}</p>

        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder='Password'
          onFocus={handlePasswordFocus}
          className={`border p-2 rounded rounded-md text-sm outline-none border border-2 w-full focus:border-[#9F42C6] transition ease-in-out duration-100 ${passwordErrorStatus ? "border-red-500 bg-red-100" : "border-gray-300 bg-white"}`}
        />
        <p className={`text-red-500 px-2 text-sm pb-1 transition ease-in-out duration-200 ${passwordErrorStatus ? "opacity-100" : "opacity-0"}`}>{passwordError}</p>

        <input
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          placeholder='Confirm password'
          onFocus={handleConfirmPasswordFocus}
          className={`border p-2 rounded rounded-md text-sm outline-none border border-2 w-full focus:border-[#9F42C6] transition ease-in-out duration-100 ${confirmPasswordErrorStatus ? "border-red-500 bg-red-100" : "border-gray-300 bg-white"}`}
        />
        <p className={`text-red-500 px-2 text-sm pb-1 transition ease-in-out duration-200 ${confirmPasswordErrorStatus ? "opacity-100" : "opacity-0"}`}>{confirmPasswordError}</p>

        <div className='flex'>
          <input
            value={code}
            onChange={handleCodeChange}
            type="text" // Changed to text to allow easier input for OTP
            placeholder='Code'
            onFocus={handleCodeFocus}
            className={`flex-grow me-2 border p-2 rounded rounded-md text-sm outline-none border border-2 focus:border-[#9F42C6] transition ease-in-out duration-100 ${codeErrorStatus ? "border-red-500 bg-red-100" : "border-gray-300 bg-white"}`}
          />
          <button
            onClick={handleGetCode}
            type='button'
            className='flex justify-center items-center font-semibold w-1/4 rounded rounded-md bg-[#9F42C6] text-white transition ease-in-out duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={otpLoading || resendOTPTimer > 0}
          >
            {otpLoading ? (
              <img src={loader} height={20} alt="" />
            ) : resendOTPTimer > 0 ? (
              `${resendOTPTimer}s`
            ) : (
              "Send Code"
            )}
          </button>
        </div>
        <p className={`text-red-500 px-2 text-sm pb-1 transition ease-in-out duration-200 ${codeErrorStatus ? "opacity-100" : "opacity-0"}`}>{codeError}</p>

        <button type='submit' className='bg-[#9F42C6] p-2 rounded rounded-md w-full text-white font-semibold hover:opacity-90 cursor-pointer transition ease-in-out duration-200'>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;