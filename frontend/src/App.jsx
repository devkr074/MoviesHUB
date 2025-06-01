import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shows from "./pages/Shows.jsx";
import Movies from "./pages/Movies.jsx";
import Calendar from "./pages/Calendar.jsx";
import Detail from "./pages/Detail.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/:type/:slug" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;