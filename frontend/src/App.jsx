import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Home from "./page/Home.jsx";
import Shows from "./page/Shows.jsx";
import Movies from "./page/Movies.jsx";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import Profile from "./page/Profile.jsx";
import Library from "./page/Library.jsx";
import Favorites from "./page/Favorites.jsx";
import RequireAuth from "./component/RequireAuth.jsx";
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows user={user} />} />
        <Route path="/movies" element={<Movies user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/favorites" element={<RequireAuth user={user}><Favorites user={user} /></RequireAuth>} />
        <Route path="/library" element={<RequireAuth user={user}><Library user={user} /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth user={user}><Profile user={user} setUser={setUser} /></RequireAuth>} />
      </Routes>
    </Router>
  );
};
export default App;