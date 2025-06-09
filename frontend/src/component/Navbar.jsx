import { useEffect } from "react";
function Navbar({ user, setUser }) {
  useEffect(() => {
    const searchBtn = document.querySelector("[data-search-btn]");
    const searchContainer = document.querySelector("[data-search-container]");
    const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
    const searchCloseBtn = document.querySelector("[data-search-close-btn]");
    const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];
    for (let i = 0; i < searchBoxElems.length; i++) {
      searchBoxElems[i].addEventListener("click", function () {
        searchContainer.classList.toggle("active");
        document.body.classList.toggle("active");
      });
    }
    const navbar = document.querySelector("[data-navbar]");
    const navbarLinks = document.querySelectorAll("[data-nav-link]");
    const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");
    menuToggleBtn.addEventListener("click", function () {
      navbar.classList.toggle("active");
      this.classList.toggle("active");
    });
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggleBtn.classList.toggle("active");
      });
    }
    const header = document.querySelector("[data-header]");
    const backTopBtn = document.querySelector("[data-back-top-btn]");
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
    });
  }, []);
  return (
    <>
      <header className="header" data-header>
        <div className="container">
          <h1>
            <a href="/" className="logo">Movies<span className="span">HUB</span></a>
          </h1>
          <nav id="navbar" className="navbar" data-navbar>
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
            <button id="nav-toggle-btn" className="nav-toggle-btn" aria-label="Toggle Menu" data-menu-toggle-btn>
              <span className="line top"></span>
              <span className="line middle"></span>
              <span className="line bottom"></span>
            </button>
          </div>
        </div>
      </header>
      <div className="search-container" id="search-container" data-search-container>
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