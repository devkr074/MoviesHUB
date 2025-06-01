import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getData from "../utils/getData.js";
import Navbar from "../components/Navbar.jsx";
function Detail() {
    const { type } = useParams();
    const { slug } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        getData(`https://api.trakt.tv/${type}/${slug}?extended=full,images`).then(data => {
            setData(data);
            setFanart(`https://${data.images.fanart}`);
            console.log(data);
        }).catch(err => {
            console.error(err);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div>
                <p>{data.title}</p>
            </div>
        </>
    );
}
export default Detail;