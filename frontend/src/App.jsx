import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TrendingShows from "./pages/TrendingShows.jsx";
import TrendingMovies from "./pages/TrendingMovies.jsx";
import StreamingShows from "./pages/StreamingShows.jsx";
import AnticipatedShows from "./pages/AnticipatedShows.jsx";
import PopularShows from "./pages/PopularShows.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows/trending" element={<TrendingShows />} />
        <Route path="/shows/streaming" element={<StreamingShows />} />
        <Route path="/movies/trending" element={<TrendingMovies />} />
        <Route path="/shows/anticipated" element={<AnticipatedShows />} />
        <Route path="/shows/popular" element={<PopularShows />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;