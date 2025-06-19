import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import logo from "../assets/logo.png"
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
        fetchShows();
        fetchMovies();
    }, []);
    return (
        <>
            <Header />
            <div
                className={`bg-black h-screen bg-cover bg-center`} style={{backgroundImage:`url(https://${backgroundImage})`}}
            >
                <div className="h-full w-full bg-[#00000077] flex items-center justify-center flex-col">
                    <img src={logo} className="size-16" alt="" />
                    <h1 className="text-4xl text-white font-bold">MoviesHUB</h1>
                    <h2>Shows. Movies. Calendar.</h2>
                </div>
            </div>
            <p className="text-3xl font-bold">Trending Shows</p>
            <div className="flex flex-wrap">
                <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                    <div className="border h-full w-full"></div>
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
        </>
    );
}
export default Home;