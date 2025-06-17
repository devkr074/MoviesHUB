import placeholder from "../assets/placeholder.webp";
function Card(props) {
  return (
    <>
      <div style={{ borderBottom: "1px solid #2d2d2d",borderRight:"1px solid #2d2d2d" }}>
        <div className="ratio ratio-16x9" style={{ backgroundImage: `url(${placeholder})`, overflow: "hidden", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
          <img src={`https://${props.image}`} alt={props.title} className="lazy-load" style={{ opacity: 0, transition: "opacity 0.5s ease-in-out", transitionDelay: "0.2s" }} onLoad={(e) => (e.target.style.opacity = 1)} />
          <div className="card-body">
            <p className="card-title position-absolute bottom-0 start-0 m-2 text-white fw-bold">{props.title}</p>
          </div>
        </div>
        <div className="text-light px-2 py-1 fs-5" style={{backgroundColor:"#1d1d1d"}}>
          <button><i class="fa-solid fa-check"></i></button>
        </div>
      </div>
    </>
  );
};
export default Card;