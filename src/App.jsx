import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './components/Favorites';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
export default App;