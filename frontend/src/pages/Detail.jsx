import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
const API_URL = "https://api.trakt.tv";
const API_HEADERS = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "53cafdd76e909db5ce700375b904ec38ae6ddd7f6431f1930f3ac88f7e480f75"
};
function Detail() {
    const { type, slug } = useParams();
    const [loading, setLoading] = useState("false");
    const [details, setDetails] = useState(null);
    useEffect(() => {
        getDetail();
    }, [type,slug]);
    async function getDetail() {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${type}/${slug}/people?extended=full,images`, { headers: API_HEADERS });
            const data = await response.json();
            setDetails(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    return (
        <div>
            <h1 className='text-white'>Detail Page</h1>
            <p className='text-white'>Type: {type}</p>
            <p className='text-white'>Slug: {slug}</p>
        </div>
    );
}
export default Detail;