import { useEffect,useState } from "react";
import logo from "../asset/logo.png"
import Card from "../component/Card.jsx"
import Footer from "../component/Footer.jsx"
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.trakt.tv/shows/trending?limit=4", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75", 
            "trakt-api-version": "2",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching Trakt data:", error);
      }
    };

    fetchData();

  }, []);
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
        {
          data.map((d,index)=>(
        <div key={index} className="col-sm-12 col-md-6 col-lg-3">
          <Card title={d.show.title} />
        </div>

          ))
        }
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