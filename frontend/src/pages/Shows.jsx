import { useState, useEffect } from "react";
import Card from "../components/Card";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": import.meta.env.VITE_API_KEY,
};
function Shows() {
    const [shows, setShows] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("trending");
    useEffect(() => {
        setLoading(true);
        async function fetchShows() {
            try {
                const response = await fetch(`${API_BASE_URL}${category}?limit=100&extended=full,images`, { headers: API_HEADERS });
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching shows:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShows();
    }, [category]);
    function handleCategoryChange(newCategory) {
        setCategory(newCategory);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="container-fluid mt-4 bg-dark min-vh-100">
            <div className="w-100 sticky-top bg-white py-2 shadow-sm overflow-auto d-flex gap-2">
                {["trending", "popular", "anticipated", "streaming"].map((c, index) => (
                    <button key={index} className={`btn ${category == c ? "btn-dark" : "btn-outline-dark"}`} onClick={() => handleCategoryChange(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
            </div>
            <h2 className="mb-3 text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Shows</h2>
            {loading ? (
                <div className="text-center mt-4 min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <div className="row m-0">
                    {shows.slice(0, visibleCount).map((s, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
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
        </div>
    );
}
export default Shows;