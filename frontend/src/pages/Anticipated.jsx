import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Anticipated() {
    const [tab, setTab] = useState("movies");
    const [anticipatedData, setAnticipatedData] = useState([]);
    useEffect(() => {
        document.title = `Anticipated ${tab[0].toLocaleUpperCase()}${tab.substring(1)} - MoviesHUB`;
        getData(`https://api.trakt.tv/${tab}/anticipated?extended=full,images`).then(data => {
            setAnticipatedData(data);
            console.log(data);
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
                {anticipatedData.map(data => {
                    const content = data.movie || data.show;
                    return (
                        <p key={content.ids.trakt}>{content.title}</p>
                    );
                })}
            </div>
        </>
    );
}
export default Anticipated;