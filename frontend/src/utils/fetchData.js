const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": import.meta.env.VITE_API_KEY,
};
export default async function fetchShows(category) {
    try {
        const response = await fetch(`${API_BASE_URL}${category}?limit=100&extended=full,images`, { headers: API_HEADERS });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching shows:", error);
    }
};