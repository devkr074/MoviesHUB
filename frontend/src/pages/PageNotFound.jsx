import { useEffect } from "react";
function PageNotFound() {
    useEffect(() => {
        document.title = "404 - Page Not Found";
    }, []);
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/">Go back to Home</a>
        </div>
    );
}
export default PageNotFound;