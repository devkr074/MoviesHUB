import { useNavigate } from 'react-router-dom';
import Header from './Header';
function Favorites() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
        </>
    );
}
export default Favorites;