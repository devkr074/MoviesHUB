import { useEffect } from "react";
import logo from "../asset/logo.png";

function Navbar({ user, setUser }) {
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  useEffect(() => {
    const navbar = document.querySelector("[data-navbar]");
    const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");
    const navbarLinks = document.querySelectorAll("[data-nav-link]");
    const header = document.querySelector("[data-header]");
    const backTopBtn = document.querySelector("[data-back-top-btn]");
    const searchBtn = document.querySelector("[data-search-btn]");
    const searchContainer = document.querySelector("[data-search-container]");
    const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
    const searchCloseBtn = document.querySelector("[data-search-close-btn]");
    
    if (menuToggleBtn) {
      menuToggleBtn.addEventListener("click", function () {
        navbar.classList.toggle("active");
        this.classList.toggle("active");
      });
    }

    navbarLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggleBtn.classList.toggle("active");
      });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY >= 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
    });

    [searchBtn, searchSubmitBtn, searchCloseBtn].forEach((elem) => {
      elem.addEventListener("click", function () {
        searchContainer.classList.toggle("active");
        document.body.classList.toggle("active");
      });
    });

  }, []);

  return (
    <>
      <header className="header" data-header>
        <div className="container">
          <h1>
            <a href="/" className="logo">
            Movies<span className="span">HUB</span>
            </a>
          </h1>
          <nav className="navbar" data-navbar>
            <ul className="navbar-list">
              <li className="nav-item">
                <a href="/shows" className="navbar-link" data-nav-link>
                  Shows
                </a>
              </li>
              <li className="nav-item">
                <a href="/movies" className="navbar-link" data-nav-link>
                  Movies
                </a>
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
          <input
            type="search"
            name="search"
            aria-label="Search here"
            placeholder="Type keywords here..."
            className="search-input"
          />
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
