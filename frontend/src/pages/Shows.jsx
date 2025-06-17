import { useState, useEffect } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
const API_URL = import.meta.env.VITE_API_URL;
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": import.meta.env.VITE_API_KEY,
};
function Shows() {
    const [shows, setShows] = useState([]);
    const [visibleCount, setVisibleCount] = useState(18);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("trending");
    async function fetchShows() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/shows/${category}?limit=100&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setShows(data);
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchShows();
    }, [category]);
    function handleCategoryChange(newCategory) {
        setCategory(newCategory);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            <Header />
            <div className="px-2 py-3 category-bar">
                {["trending", "popular", "anticipated", "streaming"].map((c, index) => (
                    <button key={index} className={`${category == c && "active"}`} onClick={() => handleCategoryChange(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
            </div>
            {loading ? (
                <div className="text-center mt-4 min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <div className="row m-0 py-2">
                    {shows.slice(0, visibleCount).map((s, index) => (
                        <div key={index} className="m-0 p-0 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <Card title={s.title || s.show.title} image={s.images?.fanart || s.show.images?.fanart || null} />
                        </div>
                    ))}
                </div>
            )}
            {visibleCount < shows.length && !loading && (
                <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={() => setVisibleCount(visibleCount + 20)}>Load More</button>
                </div>
            )}
        </>
    );
}
export default Shows;