import { useState, useEffect } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
function Home() {
    const [bannerImage, setBannerImage] = useState("");
    const [topShows, setTopShows] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        document.title = "Home - MoviesHUB";
        getData(`https://api.trakt.tv/movies/trending?extended=full,images`).then(data => {
            setBannerImage(`https://${data[Math.floor(Math.random() * 10)].movie.images.fanart}`);
        }).catch(err => {
            console.error("Error fetching banner image:", err);
        });
        getData(`https://api.trakt.tv/shows/trending?limit=4&extended=full,images`).then(data => {
            setTopShows(data);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching top shows:", err);
            setLoading(false);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div className="row m-0">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 vh-100 d-flex flex-column align-items-center justify-content-center bg-dark bg-cover bg-center bg-no-repeat position-relative" style={{ backgroundImage: `url(${bannerImage})` }}>
                    <div className="position-absolute top-0 start-0 h-100 w-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}></div>
                    <h1 className="text-light text-center position-relative">Welcome to MoviesHUB</h1>
                    <p className="text-light text-center position-relative">Your one-stop destination for all things movies!</p>
                </div>
            </div>
            <div className="row m-0 pb-5">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex align-items-center justify-content-between px-4 pt-3">
                    <h3 className="text-light">Top Shows</h3>
                    <a href="/shows">SEE MORE</a>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 px-4">
                    <p className="text-light">Here's what shows are trending now.</p>
                </div>
                {loading ? (
                    <>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-3">
                            <Card imageUrl={null} title={null} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-3">
                            <Card imageUrl={null} title={null} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-3">
                            <Card imageUrl={null} title={null} />
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-3">
                            <Card imageUrl={null} title={null} />
                        </div>
                    </>
                ) : (
                    topShows.map(d => (
                        <div key={d.show.ids.trakt} className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-3">
                            <Card imageUrl={`https://${d.show.images.fanart}`} title={d.show.title} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
export default Home;