import Header from "../components/Header.jsx";
function Shows() {
    return (
        <>
            <Header />
            <div className="row m-0">
                <div className="col-12 mt-5">
                    <button className="btn btn-primary mt-4">Trending</button>
                    <button className="btn btn-outline-primary mt-4 ms-2">Popular</button>
                    <button className="btn btn-outline-primary mt-4 ms-2">Anticipated</button>
                </div>
            </div>
        </>
    );
}
export default Shows;