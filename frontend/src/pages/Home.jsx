import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import homeBackground from "../assets/homeBackground.jpg"
import Header from "../components/Header.jsx";
import { BookmarkIcon, StarIcon, HeartIcon } from "@heroicons/react/24/solid";
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
            console.log(data);
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
                <div className="flex gap-4 p-4 border border-white flex-wrap">
                    <div className="w-full border border-white aspect-16/9 md:w-1/2 lg:w-1/4">
                        <div className="h-full rounded rounded-xl overflow-hidden relative">
                            <img src={`https://${shows[0]?.show?.images?.fanart}`} alt="" />
                            <p className="text-white absolute w-full py-3 font-semibold text-lg bg-linear-to-b from-[#00000000] to-[#00000066] px-3 bottom-0">{shows[0]?.show?.title} <span className="font-normal text-sm text-[#AAAAAA]">{shows[0]?.show?.year}</span> </p>
                        </div>
                        <div className="bg-[#1d1d1d] h-10 flex justify-between">

                            <div>
                                <button title="Add to Library" className="h-full transition duration-150 ease-in-out cursor-pointer w-10 p-2 text-[#16a085] hover:bg-[#16a085] hover:text-white">
                                    <BookmarkIcon />
                                </button>
                                <button className="h-full transition duration-150 ease-in-out cursor-pointer w-10 p-2 text-[#ff5f06] hover:bg-[#ff5f06] hover:text-white">
                                    <StarIcon />
                                </button>
                            </div>
                            <p className="w-1/2 gap-1 flex items-center justify-end p-2 text-[#9e2424]">
                                <span>
                                    <HeartIcon className="h-6" />
                                </span>
                                <span className="text-white font-bold">{Math.floor(shows[0]?.show?.rating * 10)}%</span>
                            </p>

                        </div>
                    </div>
                    <div className="w-full border border-white aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
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