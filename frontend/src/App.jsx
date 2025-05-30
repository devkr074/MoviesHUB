import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import Popular from "./pages/Popular.jsx";
import Anticipated from "./pages/Anticipated.jsx";
import Calendar from "./pages/Calendar.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/anticipated" element={<Anticipated />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;