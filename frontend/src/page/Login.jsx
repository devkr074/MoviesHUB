import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Login = ({ setUser }) => {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/login?usernameOrEmail=${encodeURIComponent(form.usernameOrEmail)}&password=${encodeURIComponent(form.password)}`,
        { method: "POST" }
      )
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate(from);
      } else {
        alert("Invalid credentials or user not verified.");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("An error occurred while logging in.");
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <div className="mb-3">
          <label className="form-label">Username or Email</label>
          <input type="text" className="form-control" name="usernameOrEmail" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
export default Login;