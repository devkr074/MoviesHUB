import { useEffect, useState } from "react";
function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);
  async function fetchFavorites() {
    if (user && user.id) {
      try {
        const response = await fetch(`http://localhost:8080/api/favorites/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  }
  useEffect(() => {
    fetchFavorites();
  }, [user]);
  return (
    <div>
      <h2>Your Favorite Movies/Shows</h2>
      {favorites.length == 0 ? (
        <p>No favorite items added yet.</p>
      ) : (
        <ul>
          {favorites.map(item => (
            <li key={item.id}>
              {item.title} ({item.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Favorites;