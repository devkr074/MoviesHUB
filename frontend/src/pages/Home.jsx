import { useState, useEffect } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import homeBackground from "../assets/homeBackground.jpg"
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import Footer from "../components/Footer.jsx";
const API_URL = "https://api.trakt.tv";
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75"
};
function Home() {
    const [loading, setLoading] = useState(false);
    const [trendingShows, setTrendingShows] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [bannerBackground, setBannerBackground] = useState(null);
    useEffect(() => {
        document.title = "Home - MoviesHUB";
        handleTrendingShows();
        handleTrendingMovies();
    }, []);
    async function handleTrendingShows() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/shows/trending?extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setTrendingShows(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function handleTrendingMovies() {
        try {
            const response = await fetch(`${API_URL}/movies/trending?extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setTrendingMovies(data);
            setBannerBackground(data[Math.floor(Math.random() * 10)]?.movie?.images?.fanart || null);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    return (
        <>
            <Header />
            <div className="h-screen bg-black bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(https://${bannerBackground})` }}>
                <div className="h-full w-full flex flex-col items-center justify-center bg-[#00000099]">
                    <div className="flex flex-col items-center justify-center gap-4 -mt-30">
                        <p className="flex items-center -ms-2"><img src={logo} alt="MoviesHUB Logo" className="h-16" /><span className="text-3xl text-white font-bold tracking-tighter -ms-2 mt-2">MoviesHUB</span></p>
                        <p className="text-2xl text-white font-bold">Discover. Track. Share.</p>
                        <p className="w-full text-white text-center px-1 md:w-3/4 lg:w-1/2"><span className="font-semibold">Discover</span> what's hot and where to stream it. <span className="font-semibold">Track</span> shows and movies you watch. <span className="font-semibold">Share</span> comments, recommendations, and ratings.</p>
                    </div>
                </div>
            </div>
            <div className="bg-cover bg-center bg-no-repeat py-3" style={{ backgroundImage: `url(${homeBackground})` }}>
                <p className="flex items-center justify-between text-2xl text-white font-bold px-3 py-5">Trending Shows<a href="/shows" className="flex items-center gap-1 text-xs font-normal hover:text-[#9F42C6] active:text-[#9F42C6]">More<ArrowRightCircleIcon className="h-4" /></a></p>
                <div className="flex flex-wrap py-2">
                    {loading ?
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} />
                        )) :
                        trendingShows.slice(0, 4).map((s, index) => (
                            <Card key={index} image={`https://${s.show.images.fanart}`} title={s.show.title} year={s.show.year} />
                        ))}
                </div>
                <p className="flex items-center justify-between text-2xl text-white font-bold px-3 py-5">Trending Movies<a href="/movies" className="flex items-center gap-1 text-xs font-normal hover:text-[#9F42C6] active:text-[#9F42C6]">More<ArrowRightCircleIcon className="h-4" /></a></p>
                <div className="flex flex-wrap py-2">
                    {loading ?
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} />
                        )) :
                        trendingMovies.slice(0, 4).map((m, index) => (
                            <Card key={index} image={`https://${m.movie.images.fanart}`} title={m.movie.title} year={m.movie.year} />
                        ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Home;