import React, { useEffect, useState } from "react";

const TrendingShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      try {
        const response = await fetch("https://api.trakt.tv/shows/trending?&limit=1721", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "trakt-api-key": "719bb35af98c7c9a1eb126dd97ffc070cb99202fd060c7b58e2f1148e03e3d3d",
            "trakt-api-version": "2"
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch trending shows");
        }
        const data = await response.json();
        setShows(data);
        console.log("Trending Shows:", data);
      } catch (error) {
        console.error("Error fetching trending shows:", error);
      }
    };

    fetchTrendingShows();
  }, []);

  return (
    <div>
    </div>
  );
};

export default TrendingShows;
