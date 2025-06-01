import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Calendar() {
    const [tab, setTab] = useState("shows");
    const [data, setData] = useState([]);
    useEffect(() => {
        document.title = `Calendar ${tab[0].toLocaleUpperCase()}${tab.substring(1)} - MoviesHUB`;
        getData(`https://api.trakt.tv/calendars/all/${tab}/2025-06-01`).then(data => {
            setData(data);
        }).catch(err => {
            console.error(err);
        });
    }, [tab]);
    return (
        <>
            <Navbar />
            <select value={tab} onChange={(e) => setTab(e.target.value)}>
                <option value="shows">Shows</option>
                <option value="movies">Movies</option>
                <option value="premieres">Premieres</option>
            </select>
            <div>
                {data.map(d => {
                    const content = d.movie || d.episode || d.show;
                    const content2 = d.movie || d.show;
                    const key = `${content.ids.trakt}-${content.title}`;
                    return (
                        <p key={key}>{content2.title}</p>
                    );
                })}
            </div>
        </>
    );
}
export default Calendar;