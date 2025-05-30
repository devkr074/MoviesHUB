import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Streaming() {
    const [tab, setTab] = useState("movies");
    const [streamingData, setStreamingData] = useState([]);
    useEffect(() => {
        document.title = `Streaming ${tab[0].toLocaleUpperCase()}${tab.substring(1)} - MoviesHUB`;
        getData(`https://api.trakt.tv/${tab}/streaming?extended=full,images`).then(data => {
            setStreamingData(data);
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
                {streamingData.map(data => {
                    const content = data.movie || data.show;
                    return (
                        <p key={content.ids.trakt}>{content.title}</p>
                    );
                })}
            </div>
        </>
    );
}
export default Streaming;