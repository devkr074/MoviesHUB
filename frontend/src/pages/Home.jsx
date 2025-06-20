import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import homeBackground from "../assets/homeBackground.jpg"
import Header from "../components/Header.jsx";
const API_URL = "https://api.trakt.tv";
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75"
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
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
    };
    async function fetchMovies() {
        try {
            const response = await fetch(`${API_URL}/movies/trending?limit=4&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setMovies(data);
            setBackgroundImage(data[Math.floor(Math.random() * 4)]?.movie?.images?.fanart || null);
            console.log(data[Math.floor(Math.random() * 4)]?.movie?.images?.fanart || null)
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        document.title = "Home - MoviesHUB";
        fetchShows();
        fetchMovies();
    }, []);
    return (
        <>
            <Header />
            <div className={`h-screen bg-black bg-cover bg-center`} style={{ backgroundImage: `url(https://${backgroundImage})` }}>
                <div className="h-full w-full flex flex-col items-center justify-center bg-[#00000077]">
                    <div className="flex flex-col items-center justify-center gap-4 -mt-30">
                        <p className="flex items-center text-3xl text-white font-bold -ms-2"><img src={logo} alt="MoviesHUB Logo" className="h-16" /><span className="tracking-tighter -ms-2 mt-2">MoviesHUB</span></p>
                        <p className="text-2xl text-white font-bold">Discover. Track. Share</p>
                        <p className="w-full text-white text-center px-1 md:w-3/4 lg:w-1/2"><span className="font-semibold">Discover</span> what's hot and where to stream it. <span className="font-semibold">Track</span> shows and movies you watch. <span className="font-semibold">Share</span> comments, recommendations, and ratings.</p>
                    </div>
                </div>
            </div>
            <div className="bg-cover bg-center" style={{ backgroundImage: `url(${homeBackground})` }}>
                <p className="text-2xl flex items-center justify-between font-bold text-white px-3 py-2">Trending Shows <a href="" className="text-xs font-normal hover:text-[blue]">More</a></p>
                <div className="flex flex-wrap">
                    <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                        <div className="relative overflow-hidden rounded-xl h-full w-full">
                            <img className="h-full w-full" src={`https://${shows[0]?.show?.images?.fanart}`} alt="" />
                            <p className="text-white absolute w-full py-3 font-semibold text-lg bg-[linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)] px-3 bottom-0">{shows[0]?.show?.title}</p>
                        </div>
                    </div>
                    <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                        <div className="border h-full w-full"></div>
                    </div>
                    <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                        <div className="border h-full w-full"></div>
                    </div>
                    <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                        <div className="border h-full w-full"></div>
                    </div>
                </div>
                <p className="text-2xl font-bold text-white px-3 py-2">Trending Movies</p>
            </div>
        </>
    );
}
export default Home;