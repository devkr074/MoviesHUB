import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Home() {
    const [bannerImage, setBannerImage] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingShows, setTrendingShows] = useState([]);
    useEffect(() => {
        document.title = "MoviesHUB - Home";
        getData("https://api.trakt.tv/shows/trending?limit=4&extended=full,images").then(data => {
            console.log(data);
            setTrendingShows(data);
        }).catch(error => {
            console.error("Error fetching popular movies:", error);
        });
        getData("https://api.trakt.tv/movies/trending?limit=4&extended=full,images").then(data => {
            console.log(data);
            setTrendingMovies(data);
        }).catch(error => {
            console.error("Error fetching popular movies:", error);
        });
        getData("https://api.trakt.tv/movies/trending?extended=full,images").then(data => {
            console.log(data);
            if (data.length > 0) {
                setBannerImage(`https://${data[Math.floor(Math.random() * 10)].movie.images.fanart}`);
            }
        }).catch(error => {
            console.error("Error fetching trending shows:", error);
        });
    }, []);
    return (
        <>
            <Navbar />
            {bannerImage && (
                <div className="banner" style={{ backgroundImage: `url(${bannerImage})`, height: '100vh', backgroundColor: 'black', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="banner-content text-white text-center" style={{ paddingTop: '150px' }}>
                        <h1>Welcome to MoviesHUB</h1>
                        <p>Your one-stop destination for trending movies and shows</p>
                    </div>
                </div>
            )}
            <div className="container mt-5 pt-5">
                <h1 className="text-center mb-4">Trending Movies</h1>
                <div className="row">
                    {trendingMovies.map(movie => (
                        <div className="col-md-3 mb-4" key={movie.movie.ids.trakt}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={`https://${movie.movie.images.fanart}`} height={150} alt="" />
                                    <h5 className="card-title">{movie.movie.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 className="text-center mb-4">Trending Shows</h1>
                <div className="row">
                    {trendingShows.map(show => (
                        <div className="col-md-3 mb-4" key={show.show.ids.trakt}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={`https://${show.show.images.fanart}`} height={150} alt="" />
                                    <h5 className="card-title">{show.show.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Home;