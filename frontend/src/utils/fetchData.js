const API_BASE_URL = "https://api.trakt.tv/shows/";
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75",
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