async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "trakt-api-key": "719bb35af98c7c9a1eb126dd97ffc070cb99202fd060c7b58e2f1148e03e3d3d",
                "trakt-api-version": "2"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default getData;