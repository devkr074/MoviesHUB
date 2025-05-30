import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Popular() {
    const [tab, setTab] = useState("movies");
    const [popularData, setPopularData] = useState([]);
    useEffect(() => {
        document.title = `Popular ${tab[0].toLocaleUpperCase()}${tab.substring(1)} - MoviesHUB`;
        getData(`https://api.trakt.tv/${tab}/popular?extended=full,images`).then(data => {
            setPopularData(data);
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
                {popularData.map(data => {
                    return (
                        <p key={data.ids.trakt}>{data.title}</p>
                    );
                })}
            </div>
        </>
    );
}
export default Popular;