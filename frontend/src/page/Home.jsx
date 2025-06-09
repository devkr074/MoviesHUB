import Card from "../component/Card.jsx"
function Home() {
  return (
    <>
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>MoviesHUB</h1>
        <p className="text-center">Welcome to MoviesHUB! Explore your favorite movies and shows.</p>
      </div>
      <div className="row m-0">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <h1>Trending Shows</h1>
          <a href="">More</a>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
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
          <Card/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card/>
        </div>
      </div>
    </>
  );
}
export default Home;