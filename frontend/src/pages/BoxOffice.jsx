import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function BoxOffice() {
    const [boxOfficeData, setBoxOfficeData] = useState([]);
    useEffect(() => {
        document.title = `Box Office - MoviesHUB`;
        getData(`https://api.trakt.tv/movies/boxoffice?extended=full,images`).then(data => {
            setBoxOfficeData(data);
            console.log(data);
        }).catch(err => {
            console.error(err);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div>
                {boxOfficeData.map(data => {
                    return (
                        <p key={data.movie.ids.trakt}>{data.movie.title} ${data.revenue}</p>
                    );
                })}
            </div>
        </>
    );
}
export default BoxOffice;