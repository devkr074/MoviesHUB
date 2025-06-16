import { useState, useEffect } from "react";

const OtpAuth = ({ email }) => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (e) => setOtp(e.target.value);

    const handleVerify = async () => {
        const response = await fetch(`http://localhost:8080/api/otp/verify?email=${email}&otp=${otp}`, {
            method: "POST",
        });
        const result = await response.text();
        setMessage(result);
    };

    const handleResend = async () => {
        setCanResend(false);
        setTimer(30);
        const response = await fetch(`http://localhost:8080/api/otp/resend?email=${email}`, {
            method: "POST",
        });
        const result = await response.text();
        setMessage(result);
    };

    return (
        <div className="row m-0 d-flex flex-column justify-content-center align-items-center min-vh-100 px-4">
            <h1 className="text-center">OTP Verification</h1>
            <form className="col-md-6 shadow p-4 bg-white rounded">
                <h4>MoviesHUB</h4>

                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                    <input type="text" required className="form-control" id="otp" placeholder="Enter OTP" onChange={handleChange} />
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={handleVerify}>
                    Verify OTP
                </button>

                <div className="text-center mt-3">
                    <p>{message}</p>
                    {canResend ? (
                        <button type="button" className="btn btn-dark w-100" onClick={handleResend}>
                            Resend OTP
                        </button>
                    ) : (
                        <p>Resend available in {timer} seconds...</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OtpAuth;
