import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shows from "./pages/Shows.jsx";
import Movies from "./pages/Movies.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import OtpAuth from "./pages/OtpAuth.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-auth" element={<OtpAuth />} />
        <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
}
export default App;