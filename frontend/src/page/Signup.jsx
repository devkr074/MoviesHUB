import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkPasswordStrength, checkPasswordMatch, validateUsername } from "../util/validation.js";
function Signup({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleGetOtp(e) {
    e.preventDefault();
    if (!validateUsername(form.username)) {
      alert("Username invalid! It should be alphanumeric, 3-15 characters long and start with a letter.");
      return;
    }
    if (!checkPasswordStrength(form.password)) {
      alert("Password is weak! It should be minimum 8 characters long with uppercase, lowercase, and a number.");
      return;
    }
    if (!checkPasswordMatch(form.password, form.confirmPassword)) {
      alert("Passwords do not match");
      return;
    }
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password
    };
    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.text();
      setMessage(data);
      if (data.includes("OTP sent")) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error during OTP request", error);
      setMessage("Error during OTP request");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!otpSent) {
      alert("Please click Get OTP first.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/users/verify-otp?email=${encodeURIComponent(form.email)}&otp=${encodeURIComponent(form.otp)}`, {
        method: "POST"
      });
      const data = await response.text();
      setMessage(data);
      if (data.includes("verified successfully")) {
        setUser({ username: form.username, email: form.email });
        alert("Signup and Verification successful.");
        navigate(from);
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      setMessage("Error during OTP verification");
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <form style={{ width: "300px" }} onSubmit={handleSubmit}>
        <h3 className="text-center">MoviesHUB SignUp</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
        </div>
        <div className="mb-3 d-flex">
          <div style={{ flex: 1 }}>
            <label className="form-label">OTP</label>
            <input type="text" className="form-control" name="otp" onChange={handleChange} required />
          </div>
          <button className="btn btn-outline-primary ms-2" onClick={handleGetOtp}>Get OTP</button>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;