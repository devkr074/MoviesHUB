window.addEventListener('load',getRandomPoster());

async function getRandomPoster() {
    const clientId = 'cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8';
    const randomType = Math.random() < 0.5 ? 'movies' : 'shows';
    const url = `https://api.trakt.tv/${randomType}/trending?extended=full,images`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': clientId
            }
        });
        const data = await response.json();
        console.log(data);
        const randomItem = data[Math.floor(Math.random() * 5)];
        let posterUrl;
        if (randomType == 'movies') {

            posterUrl = randomItem.movie.images.fanart[0];
        }
        else {

            posterUrl = randomItem.show.images.fanart[0];
        }
        const posterDiv = document.getElementById('bannerContainer');
        posterDiv.style.backgroundImage = `url("https://${posterUrl}")`;
    } catch (error) {
        console.error('Error fetching the poster:', error);
    }
}