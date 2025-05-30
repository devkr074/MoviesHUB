import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Calendar() {
    const [tab, setTab] = useState("movies");
    const [calendarData, setCalendarData] = useState([]);
    useEffect(() => {
        document.title = `Calendar ${tab[0].toLocaleUpperCase()}${tab.substring(1)} - MoviesHUB`;
        getData(`https://api.trakt.tv/calendars/all/${tab}/2025-05-29/7`).then(data => {
            setCalendarData(data);
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
                {calendarData.map(data => {
                    const content = data.movie || data.show;
                    return (
                        <p key={content.ids.trakt}>{content.title}</p>
                    );
                })}
            </div>
        </>
    );
}
export default Calendar;