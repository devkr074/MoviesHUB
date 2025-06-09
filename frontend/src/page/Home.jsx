import logo from "../asset/logo.png"
import Card from "../component/Card.jsx"
import Footer from "../component/Footer.jsx"
function Home() {
  return (
    <>
      <div className="row m-0">
        <div className="col-12 vh-100 d-flex flex-column align-items-center justify-content-center text-center bg-dark text-light">
          <h1 className="d-flex align-items-center justify-content-center"><img src={logo} alt="MoviesHUB" height={100} />MoviesHUB</h1>
          <p>Welcome to MoviesHUB! Explore your favorite movies and shows.</p>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <h1>Trending Shows</h1>
          <a href="">More</a>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <h1>Trending Movies</h1>
          <a href="">More</a>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card />
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12 text-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Home;