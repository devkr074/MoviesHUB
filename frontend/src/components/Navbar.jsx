import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
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
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector("nav");
            if (window.scrollY > 50) {
                navbar.classList.add("bg-bl");
            } else {
                navbar.classList.remove("bg-bl");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    function openSearch() {
        const searchContainer = document.querySelector(".search-container");
        searchContainer.classList.toggle("bottom-100");
        searchContainer.classList.toggle("bottom-0");
        const input = searchContainer.querySelector("input");
        const body = document.querySelector("body");
        body.classList.toggle("overflow-hidden");
        if (input) {
            input.focus();
        }
    }
    function closeSearch() {
        const searchContainer = document.querySelector(".search-container");
        searchContainer.classList.add("bottom-100");
        searchContainer.classList.remove("bottom-0");
        const body = document.querySelector("body");
        body.classList.remove("overflow-hidden");
    }
    return (
        <>
            <div className="bg-black vh-100 w-100 position-absolute bottom-100 z-2 search-container d-flex justify-content-center">
                <div className="col-8 mt-5"><input type="text" className="form-control rounded-end shadow-none" /></div>
                <button className="btn fs-3 position-absolute top-0 end-0 mt-1 me-2 text-light border-0" onClick={closeSearch}><i class="fa-solid fa-xmark"></i></button>
            </div>
            <nav className={`navbar navbar-expand-lg w-100 position-fixed top-0 z-1 ${activePath == "" && "active"}`}>
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between">
                        <a className="navbar-brand text-light" href="/"><img src={logo} alt="MoviesHUB Logo" height={40} /></a>
                        <button className="border-0 bg-transparent p-0" onClick={openSearch} ><i class="fa-solid fa-magnifying-glass text-light"></i></button>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon bg-white"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link fw-semibold ${activePath == "shows" && "current"}`} href="/shows">Shows</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link fw-semibold ${activePath == "movies" && "current"}`} href="/movies">Movies</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link fw-semibold ${activePath == "calendar" && "current"}`} href="/calendar">Calendar</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link fw-semibold dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Guest</a>
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
        </>
    );
}
export default Navbar;