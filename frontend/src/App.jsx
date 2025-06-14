import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shows from "./pages/Shows.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
      </Routes>
    </Router>
  );
}
export default App;