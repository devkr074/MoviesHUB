import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Trending() {
    const [tab, setTab] = useState("movies");
    const [trendingData, setTrendingData] = useState([]);
    useEffect(() => {
        document.title = `Trending ${tab[0].toLocaleUpperCase()}${tab.substring(1)} - MoviesHUB`;
        getData(`https://api.trakt.tv/${tab}/trending?extended=full,images`).then(data => {
            setTrendingData(data);
        }).catch(err => {
            console.error(err);
        });
    }, [tab]);
    return (
        <>
            <Navbar />
            <select value={tab} onChange={(e) => setTab(e.target.value)}>
                <option value="movies">Movies</option>
                <option value="shows">Shows</option>
            </select>
            <div>
                {trendingData.map(data => {
                    const content = data.movie || data.show;
                    const fanart = `https://${content.images.fanart}`;
                    const link = `${tab}/${content.ids.slug}`;
                    return (
                        <div key={content.ids.trakt}>
                            <a href={link}>
                                <img src={fanart} alt={content.title} width={300} />
                            </a>
                            <p>{content.title}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default Trending;