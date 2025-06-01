import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Movies() {
    const [tab, setTab] = useState("trending");
    const [data, setData] = useState([]);
    useEffect(() => {
        document.title = `${tab[0].toUpperCase()}${tab.substring(1)} Movies - MoviesHUB`;
        getData(`https://api.trakt.tv/movies/${tab}?extended=full,images`).then(data => {
            setData(data);
        }).catch(err => {
            console.error(err);
        });
    }, [tab]);
    return (
        <>
            <Navbar />
            <select value={tab} onChange={(e) => setTab(e.target.value)}>
                <option value="trending">Trending</option>
                <option value="popular">Popular</option>
                <option value="anticipated">Anticipated</option>
                <option value="streaming">Streaming</option>
                <option value="boxoffice">Box Office</option>
            </select>
            <div>
                {data.map(d => {
                    const content = d.movie || d;
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
export default Movies;