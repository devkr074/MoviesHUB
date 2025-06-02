import { useState, useEffect } from "react";
function Navbar() {
    const [activePath, setActivePath] = useState("");
    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("/shows")) {
            setActivePath("shows");
        } else if (currentPath.includes("/movies")) {
            setActivePath("movies");
        } else if (currentPath.includes("/calendar")) {
            setActivePath("calendar");
        } else {
            setActivePath("");
        }
    }, []);
    return (
        <nav className="navbar navbar-expand-lg bg-transparent w-100 position-fixed top-0 z-1">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="/">MoviesHUB</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link text-light ${activePath == "shows" && "fw-bold"}`} href="/shows">Shows</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link text-light ${activePath == "movies" && "fw-bold"}`} href="/movies">Movies</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link text-light ${activePath == "calendar" && "fw-bold"}`} href="/calendar">Calendar</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Guest</a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Login</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Sign Up</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;