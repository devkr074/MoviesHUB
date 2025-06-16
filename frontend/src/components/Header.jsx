import { useEffect } from "react";

function Header() {
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            const navbar = document.querySelector(".navbar");
            if (window.scrollY > 80) {
                navbar.classList.add("active");
            } else {
                navbar.classList.remove("active");
            }
        });
    },[]);
    return (
        <nav className="navbar navbar-expand-lg w-100 position-fixed z-3">
            <div className="container-fluid">
                <a className="navbar-brand fs-4 fw-semibold text-light" href="#">Movies<span className="text-purple">HUB</span></a>
                <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="text-light">T</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link fw-bold text-purple" aria-current="page" href="/shows">Shows</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold text-light" href="/movies">Movies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold text-light" href="/login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Header;