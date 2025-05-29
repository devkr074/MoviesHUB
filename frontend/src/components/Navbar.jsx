import logo from '../assets/logo.png';
function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-container">
                <img src={logo} alt="MoviesHUB Logo" height={50} />
                <input type="text" className='search' />
                <select className='select' name="" id="">
                    <option value="">Shows</option>
                    <option value="">Movies</option>
                    <option value="">People</option>
                </select>
            </div>
        </div>
    );
}
export default Navbar;