import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shows from "./pages/Shows.jsx";
import Movies from "./pages/Movies.jsx";
import Detail from "./pages/Detail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/:type/:slug" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;