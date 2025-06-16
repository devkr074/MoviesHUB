import { useEffect } from "react";
function Login() {
    useEffect(() => {
        document.title = "Login - MoviesHUB";
    }, []);
    return (
        <div className="row m-0 d-flex flex-column justify-content-center align-items-center min-vh-100 px-4">
            <h1 className="text-center">Login</h1>
            <form className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-2 shadow shadow-light p-4 bg-white rounded">
                <h4>MoviesHUB</h4>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
export default Login;