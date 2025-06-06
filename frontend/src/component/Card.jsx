import { useEffect, useState } from "react";
function Card({ title, type, user }) {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  useEffect(() => {
    if (user) {
      async function fetchUserData() {
        try {
          const libraryResponse = await fetch(`http://localhost:8080/api/library/${user.id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          const favoritesResponse = await fetch(`http://localhost:8080/api/favorites/${user.id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (libraryResponse.ok && favoritesResponse.ok) {
            const libraryData = await libraryResponse.json();
            const favoritesData = await favoritesResponse.json();
            setIsInLibrary(libraryData.some(item => item.title == title));
            setIsInFavorites(favoritesData.some(item => item.title == title));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      fetchUserData();
    }
  }, [user, title]);
  async function handleAction(actionType, isRemoving) {
    if (!user) {
      alert("Please login to perform this action. Redirecting to Login.");
      window.location.href = "/login";
      return;
    }
    const payload = {
      userId: user.id,
      title: title,
      type: type
    };
    const url = `http://localhost:8080/api/${actionType.toLowerCase()}/${isRemoving ? "remove" : "add"}`;
    const method = isRemoving ? "DELETE" : "POST";
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const successMessage = isRemoving
        ? `${title} removed from ${actionType}`
        : `${title} added to ${actionType}`;
      alert(successMessage);
      if (actionType === "Library") {
        setIsInLibrary(!isRemoving);
      } else {
        setIsInFavorites(!isRemoving);
      }
    } catch (error) {
      console.error(`Error updating ${actionType}:`, error);
      alert(`Error updating ${title} in ${actionType}`);
    }
  }
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {isInLibrary ? (
          <button className="btn btn-danger me-2" onClick={() => handleAction("Library", true)}>Remove from Library</button>
        ) : (
          <button className="btn btn-primary me-2" onClick={() => handleAction("Library", false)}>Add to Library</button>
        )}
        {isInFavorites ? (
          <button className="btn btn-danger" onClick={() => handleAction("Favorites", true)}>Remove from Favorites</button>
        ) : (
          <button className="btn btn-secondary" onClick={() => handleAction("Favorites", false)}>Add to Favorites</button>
        )}
      </div>
    </div>
  );
}
export default Card;