import placeholder from "../assets/placeholder.webp";
function Card(props) {
  return (
    <div className="ratio ratio-16x9 card position-relative shadow-sm" style={{ backgroundImage: `url(${placeholder})`,overflow:"hidden", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderRadius: "8px" }}>
      <img src={`https://${props.image}`} alt={props.title} className="lazy-load" style={{ opacity: 0, transition: "opacity 0.5s ease-in-out", transitionDelay: "0.2s" }} onLoad={(e) => (e.target.style.opacity = 1)} />
      <div className="card-body">
        <p className="card-title position-absolute bottom-0 start-0 m-2 text-white fw-bold" style={{textShadow: "1px 1px 0px black,1px -1px 0px black,-1px 1px 0px black,-1px -1px 0px black"}} >{props.title}</p>
      </div>
    </div>
  );
};
export default Card;