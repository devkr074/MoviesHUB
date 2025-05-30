import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
function Home() {
    useEffect(() => {
        document.title = "Home - MoviesHUB";
    }, []);
    return (
        <>
            <Navbar />
        </>
    )
}
export default Home;