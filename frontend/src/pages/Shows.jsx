import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Shows() {
    const [activeTab, setActiveTab] = useState("trending");
    const [trendingShows, setTrendingShows] = useState([]);
    useEffect(() => {
        document.title = "Trending Shows - MoviesHUB";
        getData(`https://api.trakt.tv/shows/${activeTab}?limit=4&extended=full,images`).then(data => {
            console.log(data);
            setTrendingShows(data);
        }).catch(error => {
            console.error("Error fetching popular movies:", error);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
                <h1 className="text-center mb-4">Trending Shows</h1>
                <div className="row">
                    {trendingShows.map(show => (
                        <div className="col-md-3 mb-4" key={show.show.ids.trakt}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={`https://${show.show.images.fanart}`} height={150} alt="" />
                                    <h5 className="card-title">{show.show.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Shows;