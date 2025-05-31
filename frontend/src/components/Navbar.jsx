import { PersonIcon, ThreeBarsIcon } from '@primer/octicons-react'
import logo from '../assets/logo.png';
function Navbar() {
    return (
        <div className="navbar">
            <a href="/"><img src={logo} alt="MoviesHUB Logo" height={50} /></a>
            <div className="search-container">
                <input type="text" placeholder="Search..." />
                <div className="search-result-container"></div>
            </div>
            <div className="nav-links">
                <ul className="navbar-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#home">Home</a></li>
                </ul>
                <div className="user-actions">
                    <button><PersonIcon size={24} /></button>
                    <div className="user-collapse">
                        <ol>
                            <li><a href="">Login</a></li>
                            <li><a href="">Login</a></li>
                        </ol>
                    </div>
                </div>
            </div>
            <div>
                <button>
                    <ThreeBarsIcon size={24} />
                </button>
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Navbar;