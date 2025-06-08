function Navbar({ user, setUser }) {
  return (
    <>
      <header className="header" data-header>
        <div className="container">
          <h1>
            <a href="/" className="logo">Movies<span className="span">HUB</span></a>
          </h1>
          <nav className="navbar" data-navbar>
            <ul className="navbar-list">
              <li className="nav-item">
                <a href="/shows" className="navbar-link" data-nav-link>Shows</a>
              </li>
              <li className="nav-item">
                <a href="/movies" className="navbar-link" data-nav-link>Movies</a>
              </li>
            </ul>
          </nav>
          <div className="header-btn-group">
            <button className="search-btn" aria-label="Search" data-search-btn>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className="nav-toggle-btn" aria-label="Toggle Menu" data-menu-toggle-btn>
              <span className="line top"></span>
              <span className="line middle"></span>
              <span className="line bottom"></span>
            </button>
          </div>
        </div>
      </header>
      <div className="search-container" data-search-container>
        <div className="search-box">
          <input type="search" name="search" aria-label="Search here" placeholder="Type keywords here..." className="search-input" />
          <button className="search-submit" aria-label="Submit search" data-search-submit-btn>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button className="search-close-btn" aria-label="Cancel search" data-search-close-btn></button>
      </div>
    </>
  );
}
export default Navbar;