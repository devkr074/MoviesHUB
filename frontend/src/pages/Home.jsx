import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
const API_URL = import.meta.env.VITE_API_URL;
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": import.meta.env.VITE_API_KEY,
};
function Home() {
    const [loading, setLoading] = useState(false);
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    async function fetchShows() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/shows/trending?limit=4&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setShows(data);
            setBackgroundImage(data[Math.floor(Math.random() * 4)]?.show?.images?.fanart || null);
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
    };
    async function fetchMovies() {
        try {
            const response = await fetch(`${API_URL}/movies/trending?limit=4&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchShows();
        fetchMovies();
    }, []);
    return (
        <>
            <Header />
            <div className="row m-0">
                <div style={{height:"110vh"}} className="col-12 d-flex flex-column align-items-center justify-content-center bg-black position-relative">
                    <img style={{ height:"100%",width:"100%", opacity: 0, transition: "opacity 0.5s ease-in-out", transitionDelay: "0.2s" }} onLoad={(e) => (e.target.style.opacity = 1)} src={`https://${backgroundImage}`} alt="" />
                    <div style={{height:"110vh"}} className="col-12 bg-shade position-absolute z-1"></div>
                    <h1 className="text-light text-center position-absolute z-2">MoviesHUB</h1>
                    <p className="col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6 fs-5 text-light text-center position-absolute z-2 mt-3">Explore. Discover. Track.</p>
                </div>
            </div>
            <div className="row m-0">
                <div className="col-12">
                    <h1>Trending Shows</h1>
                </div>
            </div>
            {loading ? (
                <div className="row m-0">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
                            <Card title={null} image={null} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row m-0">
                    {shows.map((s, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
                            <Card title={s.show.title} image={s.show.images?.fanart || null} />
                        </div>
                    ))}
                </div>
            )}
            <div className="row m-0">
                <div className="col-12">
                    <h1>Trending Movies</h1>
                </div>
            </div>
            {loading ? (
                <div className="row m-0">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
                            <Card title={null} image={null} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row m-0">
                    {movies.map((m, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
                            <Card title={m.movie.title} image={m.movie.images?.fanart || null} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default Home;