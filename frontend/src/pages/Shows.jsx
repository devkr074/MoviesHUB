import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const API_BASE_URL = "https://api.trakt.tv/shows/";
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75",
};

function Shows() {
    const [shows, setShows] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("trending");

    const fetchShows = async () => {
        setLoading(true); // Show loader while fetching
        try {
            const response = await fetch(`${API_BASE_URL}${category}?limit=100&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setShows(data);
            console.log("Fetched shows:", data); // Log fetched shows for debugging
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
        setLoading(false); // Hide loader after fetching
    };

    useEffect(() => {
        fetchShows();
    }, [category]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when switching category
    };

    return (
        <div className="container-fluid mt-4">
            <div className="btn-group w-100 sticky-top bg-white py-2 shadow-sm">
                {["trending", "popular", "anticipated"].map((cat) => (
                    <button
                        key={cat}
                        className={`btn ${category === cat ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            <h2 className="mb-3 text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Shows</h2>

            {loading ? (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary"></div> {/* Loader */}
                </div>
            ) : (
                <div className="row m-0">
                    {shows.slice(0, visibleCount).map((show, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
                            <Card title={show.title || show.show.title} image={show.images?.fanart || show.show.images?.fanart} />
                        </div>
                    ))}
                </div>
            )}

            {visibleCount < shows.length && !loading && (
                <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={() => setVisibleCount(visibleCount + 8)}>Load More</button>
                </div>
            )}
        </div>
    );
};

export default Shows;
