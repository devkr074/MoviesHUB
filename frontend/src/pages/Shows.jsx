import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import Footer from "../components/Footer.jsx";
const API_URL = "https://api.trakt.tv";
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75"
};
function Shows() {
    const [category, setCategory] = useState("Trending");
    const [loading, setLoading] = useState("false");
    const [shows, setShows] = useState([]);
    useEffect(() => {
        document.title = `${category} Shows - MoviesHUB`;
        handleShows();
    }, [category]);
    async function handleShows() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/shows/${category.toLowerCase()}?limit=96&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setShows(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    function handleCategoryChange(e) {
        setCategory(e.target.value);
        document.getElementById("root").scrollTop = "0px";
    }
    return (
        <>
            <Header />
            <div className="flex gap-2 p-2 bg-[#000000CC] backdrop-blur-xs overflow-auto sticky top-[64px] z-10" style={{ scrollbarWidth: "none" }}>
                {["Trending", "Anticipated", "Popular", "Streaming"].map((c, index) => (
                    <button key={index} className={`text-white font-semibold border border-2 border-[#9F42C6] rounded-md cursor-pointer transition ease-in-out duration-300 px-2 py-1 hover:bg-[#9F42C6] focus:bg-[#9F42C6] ${category == c && "bg-[#9F42C6]"}`} value={c} onClick={handleCategoryChange}>{c}</button>
                ))}
            </div>
            <div className="flex flex-wrap">
                {loading ?
                    <div className="h-screen w-full flex items-start justify-center">
                        <img src={logo} alt="MoviesHUB Logo" className="h-24 animate-pulse mt-5" />
                    </div> :
                    shows.map((s, index) => (
                        <Card key={index} type="shows" slug={s.show.ids.slug} category={category} image={`https://${s.show.images.fanart}` || null} title={s.show.title} year={s.show.year} rating={s.show.rating} watchers={s.watchers} />
                    ))}
            </div>
            <Footer />
        </>
    );
}
export default Shows;