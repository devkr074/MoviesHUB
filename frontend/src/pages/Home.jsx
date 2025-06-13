import Header from "../components/Header.jsx";
function Home() {
    return (
        <>
            <Header />
            <div className="row m-0">
                <div className="col-12 bg-dark text-white vh-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-center">MoviesHUB</h1>
                    <p className="col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6 text-center mt-3 fs-5">Explore. Discover. Share.</p>
                </div>
            </div>
        </>
    );
}
export default Home;