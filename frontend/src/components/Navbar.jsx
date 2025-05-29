import logo from '../assets/logo.png';
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent bg-hover fixed-top">
            <div className="container">
                <a className="navbar-brand d-flex" href="/">
                    <img src={logo} alt="MoviesHUB Logo" height={30} />
                    MoviesHUB
                </a>
                <input type="text" placeholder="Search" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/shows/trending">Shows</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/movies/trending">Movies</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;