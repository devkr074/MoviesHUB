import placeholder from "../assets/placeholder.png"; // Importing a placeholder image
import React from "react";
function Card({ title, image }) {
  return (
    <div
      className="ratio ratio-16x9 card position-relative shadow-sm"
      style={{
        backgroundColor: "gray", // Light background color
        backgroundImage: `url(${placeholder})`, // Use placeholder if real image is unavailable
        backgroundSize: "60% 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "8px",
      }}
    >
      <img
        src={`https://${image}`}
        alt={title}
        className="lazy-load"
        style={{ opacity: 0, transition: "opacity 0.5s ease-in-out",transitionDelay: "0.2s" }}
        onLoad={(e) => (e.target.style.opacity = 1)} // Lazy load effect
      />
      <div className="card-body">
        <p className="card-title position-absolute bottom-0 start-0 m-2 text-white fw-bold">{title}</p>
      </div>
    </div>
  );
};

export default Card;
