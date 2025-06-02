import logo from '../assets/logo.png';
function Card({imageUrl, title}) {
    return (
        <div className="card bg-dark text-white d-flex flex-column w-100 rounded-4 bg-30 bg-center bg-no-repeat border border-2 border-light ratio ratio-16x9 mt-3" style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : `url(${logo})`,backgroundSize:'cover' }}>
            <div className="card-body d-flex flex-column justify-content-end">
                {title && <h5 className="card-title text-white text-center mt-auto">{title}</h5>}
            </div>
        </div>
    );
}
export default Card;