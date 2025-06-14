import placeholder from "../assets/placeholder.png";
function Card(props) {
  return (
    <div className="ratio ratio-16x9 card position-relative shadow-sm" style={{ backgroundColor: "gray", backgroundImage: `url(${placeholder})`, backgroundSize: "60% 70%", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderRadius: "8px" }}>
      <img src={`https://${props.image}`} alt={title} className="lazy-load" style={{ opacity: 0, transition: "opacity 0.5s ease-in-out", transitionDelay: "0.2s" }} onLoad={(e) => (e.target.style.opacity = 1)} />
      <div className="card-body">
        <p className="card-title position-absolute bottom-0 start-0 m-2 text-white fw-bold">{props.title}</p>
      </div>
    </div>
  );
};
export default Card;