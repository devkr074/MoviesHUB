import { useState, useEffect } from "react";
import Card from "../components/Card";
const API_URL = import.meta.env.VITE_API_URL;
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": import.meta.env.VITE_API_KEY,
};
function Movies() {
    const [movies, setMovies] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("trending");
    async function fetchMovies() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/movies/${category}?limit=100&extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchMovies();
    }, [category]);
    function handleCategoryChange(newCategory) {
        setCategory(newCategory);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="container-fluid mt-4 bg-dark min-vh-100">
            <div className="w-100 sticky-top bg-white py-2 shadow-sm overflow-auto d-flex gap-2">
                {["trending", "popular", "anticipated", "streaming","boxoffice"].map((c, index) => (
                    <button key={index} className={`btn ${category == c ? "btn-dark" : "btn-outline-dark"}`} onClick={() => handleCategoryChange(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
            </div>
            <h2 className="mb-3 text-center">{category.charAt(0).toUpperCase() + category.slice(1)} Movies</h2>
            {loading ? (
                <div className="text-center mt-4 min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <div className="row m-0">
                    {movies.slice(0, visibleCount).map((s, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mb-3">
                            <Card title={s.title || s.movie.title} image={s.images?.fanart || s.movie.images?.fanart || null} />
                        </div>
                    ))}
                </div>
            )}
            {visibleCount < movies.length && !loading && (
                <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={() => setVisibleCount(visibleCount + 20)}>Load More</button>
                </div>
            )}
        </div>
    );
}
export default Movies;