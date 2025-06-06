import logo from "../asset/logo.png"
function Navbar({ user, setUser }) {
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
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
  const deliveryBoy = document.querySelector("[data-delivery-boy]");
  let deliveryBoyMove = -80;
  let lastScrollPos = 0;
  window.addEventListener("scroll", function () {
    let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;
    if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
      let activeScrollPos = window.scrollY;
      if (lastScrollPos < activeScrollPos) {
        deliveryBoyMove += 1;
      } else {
        deliveryBoyMove -= 1;
      }
      lastScrollPos = activeScrollPos;
      deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
    }
  });



  return (
    <>
      <header class="header" data-header>
        <div class="container">
          <h1>
            <a href="#top" class="logo">Foodie<span class="span">.</span></a>
          </h1>
          <nav class="navbar" data-navbar>
            <ul class="navbar-list">
              <li class="nav-item active">
                <a href="index.html" class="navbar-link" data-nav-link>Home</a>
              </li>
              <li class="nav-item">
                <a href="shop.html" class="navbar-link" data-nav-link>Shop</a>
              </li>
              <li class="nav-item">
                <a href="about.html" class="navbar-link" data-nav-link>About Us</a>
              </li>
              <li class="nav-item">
                <a href="contact.html" class="navbar-link" data-nav-link>Contact Us</a>
              </li>
            </ul>
          </nav>
          <div class="header-btn-group">
            <button class="search-btn" aria-label="Search" data-search-btn>
              <ion-icon name="search-outline"></ion-icon>
            </button>
            <button class="btn btn-hover"><a href="#booking">Reservation</a></button>
            <button class="nav-toggle-btn" aria-label="Toggle Menu" data-menu-toggle-btn>
              <span class="line top"></span>
              <span class="line middle"></span>
              <span class="line bottom"></span>
            </button>
          </div>
        </div>
      </header>
      <div class="search-container" data-search-container>
        <div class="search-box">
          <input type="search" name="search" aria-label="Search here" placeholder="Type keywords here..."
            class="search-input" />
          <button class="search-submit" aria-label="Submit search" data-search-submit-btn>
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <button class="search-close-btn" aria-label="Cancel search" data-search-close-btn></button>
      </div>
    </>
  );
}
export default Navbar;