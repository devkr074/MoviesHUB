import logo from "../asset/logo.png"
function Navbar({ user, setUser }) {
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  function handleSearch() {
    const searchCont=document.getElementById("sear");
    searchCont.classList.toggle("top-height");

  }
  return (
    <div className="navbar d-flex align-items-center justify-content-between px-4">
      <div className="search-cont" id="sear">
        <button onClick={handleSearch}>Close</button>
      </div>
      <div className="logo d-flex align-items-center justify-content-center gap-3">
        <a href="/"><img src={logo} alt="MoviesHUB Logo" height={50} /></a>
        <button className="search-btn" onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div className="links d-flex align-items-center gap-4">
        <div className="position-relative">
          <button className="navbar-toggler"><i class="fa-solid fa-bars"></i></button>
          <div className="navbar-toggler-link shadow position-absolute end-0">
            <ul>
              <li><a href="/shows">Shows</a></li>
              <li><a href="/movies">Movies</a></li>
            </ul>
          </div>
        </div>
        <ul className="d-flex align-items-center gap-4">
          <li><a href="/shows">Shows</a></li>
          <li><a href="/movies">Movies</a></li>
        </ul>
        <div className="position-relative">
          <button className="user"><i class="fa-solid fa-user"></i></button>
          <div className="user-link shadow position-absolute end-0">
            <ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;