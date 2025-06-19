import Header from "../components/Header.jsx";
function Home() {
    return (
        <>
            <Header />
            <div className="bg-black h-screen">
                <div>
                    <h1>MoviesHUB</h1>
                    <h2>Shows. Movies. Calendar.</h2>
                </div>
            </div>
            <p className="text-2xl font-bold">Trending Shows</p>
            <div className="flex flex-wrap">
                <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                    <div className="border h-full w-full"></div>
                </div>
                <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                    <div className="border h-full w-full"></div>
                </div>
                <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                    <div className="border h-full w-full"></div>
                </div>
                <div className="w-full aspect-16/9 p-2 md:w-1/2 lg:w-1/4">
                    <div className="border h-full w-full"></div>
                </div>
            </div>
        </>
    );
}
export default Home;