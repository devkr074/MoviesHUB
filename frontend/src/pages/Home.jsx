import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx"
import Banner from "../components/Banner.jsx";
function Home() {
    useEffect(() => {
        document.title = "MoviesHUB - Home";
    }, []);
    return (
        <>
            <Navbar />
            <Banner />
        </>
    )
}
export default Home