import placeholder from "../asset/placeholder.png"
function Card() {
  return (
    <div className="card ratio ratio-16x9 bg-dark my-2 position-relative">
      <img className="base" src={placeholder} alt="" />
      <h4 className="text-light title">RRR</h4>
    </div>
  );
}
export default Card;