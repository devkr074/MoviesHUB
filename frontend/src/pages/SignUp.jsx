import { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result = await response.text();
        setMessage(result);
        setTimeout(() => {
            if (response.ok) {
                window.location.href = "/otp-auth";
            }
        })
    };

    return (
        <div className="row m-0 d-flex flex-column justify-content-center align-items-center min-vh-100 px-4">
            <h1 className="text-center">Sign Up</h1>
            <form onSubmit={handleSubmit} className="col-md-6 shadow p-4 bg-white rounded">
                <h4>MoviesHUB</h4>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" required className="form-control" id="username" placeholder="Enter your username" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-Mail</label>
                    <input type="email" required className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required className="form-control" id="password" placeholder="Enter your password" onChange={handleChange} />
                </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                {message && <p className="text-center mt-3 text-danger">{message}</p>}
            </form>
        </div>
    );
};

export default SignUp;