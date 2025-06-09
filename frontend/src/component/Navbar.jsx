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
  }, []);
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-transparent position-fixed w-100">
        <div class="container-fluid">
          <div className="header-btn-group d-flex align-items-center gap-4">
            <button className="search-btn" aria-label="Search" data-search-btn>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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