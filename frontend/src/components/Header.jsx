import logo from "../assets/logo.png";
function Header() {
    function toggleSearchContainer() {
        document.querySelector("#root").classList.toggle("active");
        document.querySelector(".search-container").classList.toggle("active");
    }
    return (
        <>
            <div className="search-container p-5">
                <input className="form-control" placeholder="Search Show, People, Movies..." type="text" />
                <h1>Search Result for </h1>
                <div className="search-result"></div>
                <button onClick={toggleSearchContainer}><i className="fa-solid fa-close"></i></button>
            </div>
            <div className="d-flex align-items-center m-0 w-100 p-2 sticky-top nav">
                <div className="w-50 d-flex align-items-center gap-1">
                    <a href="/"><img src={logo} className="text-decoration-none text-reset" alt="MoviesHUB Logo" height={50} /></a>
                    <button className="bg-transparent border-0 d-flex align-items-center justify-content-center" onClick={toggleSearchContainer}><i class="fa-solid fa-magnifying-glass text-light fs-5"></i></button>
                </div>
                <div className="w-50 d-flex align-items-center justify-content-end gap-2">
                    <ul className="m-0 d-flex gap-4 nav-link me-3 m-0 p-0 list-unstyled">
                        <li className="nav-link p-0 fw-semibold"><a className="text-decoration-none text-reset" href="/shows">Shows</a></li>
                        <li className="nav-link p-0 fw-semibold"><a className="text-decoration-none text-reset" href="/movies">Movies</a></li>
                    </ul>
                    <div className="position-relative dropdown nav-dropdown">
                        <button className="d-flex align-items-center justify-content-center border-0 rounded-top-3 p-2"><i class="fa-solid fa-bars fs-5"></i></button>
                        <ul className="position-absolute end-0 z-2 bg-white py-2 m-0 p-0 list-unstyled rounded-start-3 rounded-bottom-3">
                            <li><a className="fw-semibold d-block px-3 py-1 text-decoration-none text-reset" href="/shows">Shows</a></li>
                            <li><a className="fw-semibold d-block px-3 py-1 text-decoration-none text-reset" href="/movies">Movies</a></li>
                        </ul>
                    </div>
                    <div className="position-relative dropdown">
                        <button className="d-flex align-items-center justify-content-center border-0 rounded-top-3 p-2"><i class="fa-solid fa-user fs-5"></i></button>
                        <ul className="position-absolute end-0 z-2 bg-white py-2 m-0 p-0 list-unstyled rounded-start-3 rounded-bottom-3">
                            <li><a className="fw-semibold d-block px-3 py-1 text-decoration-none text-reset" href="/login">Login</a></li>
                            <li><a className="fw-semibold d-block px-3 py-1 text-decoration-none text-reset" href="/signup">Sign Up</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;