import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Shows from "./pages/Shows"
import Movies from "./pages/Movies"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/shows" element={<Shows/>} />
        <Route path="/movies" element={<Movies/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
