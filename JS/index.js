async function fetchData() {
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/movies/trending`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": clientId
            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Finished');
    }
}