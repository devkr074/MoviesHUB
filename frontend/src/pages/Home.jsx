import Header from "../components/Header.jsx";
function Home() {
    return (
        <>
            <Header />
            <div className="row m-0">
                <div className="col-12 vh-100 d-flex flex-column align-items-center justify-content-center bg-black position-relative">
                    <div className="col-12 vh-100 bg-shade position-absolute z-1"></div>
                    <h1 className="text-light text-center position-relative z-2">MoviesHUB</h1>
                    <p className="col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6 fs-5 text-light text-center position-relative z-2 mt-3">Explore. Discover. Track.</p>
                </div>
            </div>
            <div className="row m-0">
                <div className="col-12 d-flex align-items-center justify-content-between p-3">
                    <p className="m-0">Trending Movies</p>
                    <a href="#">More</a>
                </div>
            </div>
            <div className="row m-0">
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="card ratio ratio-16x9">
                        <p>Title</p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="card ratio ratio-16x9">
                        <p>Title</p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="card ratio ratio-16x9">
                        <p>Title</p>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
                    <div className="card ratio ratio-16x9">
                        <p>Title</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;