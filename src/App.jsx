import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Watchlist from './components/Watchlist';
import Favorites from './components/Favorites';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Watchlist />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
export default App;