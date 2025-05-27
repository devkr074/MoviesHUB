import logo from '../assets/logo.jpg';
function Banner() {
    return (
        <>
            <div className="container bg-dark banner d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>
                <div className="text-white">
                    <h1> <img src={logo} alt="" height={50} /> MoviesHUB</h1>
                    <h1>Discover. Track. Explore.</h1>
                    <p>Discover what's hot and where to stream it. Track shows and movies you watch. Share comments, recommendations, and ratings.</p>
                    <a href="/movies" className="btn btn-primary">Explore Movies</a>
                </div>
            </div>
        </>
    )
}
export default Banner