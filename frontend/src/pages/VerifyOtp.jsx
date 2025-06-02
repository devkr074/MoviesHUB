import { useState } from "react";
import axios from "axios";

const VerifyOtp = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
                email,
                otp,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error: OTP verification failed.");
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerifyOtp}>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Verify OTP & Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default VerifyOtp;
