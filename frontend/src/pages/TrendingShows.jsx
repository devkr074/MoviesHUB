import { useEffect, useState } from "react";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function TrendingShows() {
    const [activeTab, setActiveTab] = useState("trending");
    const [trendingShows, setTrendingShows] = useState([]);
    useEffect(() => {
        document.title = "Trending Shows - MoviesHUB";
        getData(`https://api.trakt.tv/shows/${activeTab}?limit=1000&extended=full,images`).then(data => {
            console.log(data);
            setTrendingShows(data);
        }).catch(error => {
            console.error("Error fetching popular movies:", error);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div className="sidebar">
                <div className="sidebar-content">
                    <h2>Trending Shows</h2>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === "trending" ? "active" : ""}`} href="/shows/trending" onClick={() => setActiveTab("trending")}>Trending</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === "popular" ? "active" : ""}`} href="/shows/streaming" onClick={() => setActiveTab("popular")}>Streaming</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === "anticipated" ? "active" : ""}`} href="/shows/anticipated" onClick={() => setActiveTab("anticipated")}>Anticipated</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === "popular" ? "active" : ""}`} href="/shows/popular" onClick={() => setActiveTab("popular")}>Popular</a>
                        </li>
                    </ul>
                </div>
            </div>
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
export default TrendingShows;