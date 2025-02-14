const mainContainer = document.getElementById("mainContainer");
const navbarContainer = document.getElementById("navbarContainer");
const bannerContainer = document.getElementById("bannerContainer");
const trendingSection = document.getElementById("trendingSection");

mainContainer.addEventListener("scroll", function () {
    if (mainContainer.scrollTop >= 80) {
        navbarContainer.classList.add("active");
    }
    else {
        navbarContainer.classList.remove("active");
    }
});

window.addEventListener("load", async function () {
    try {
        const data1 = await getTrendingData(`https://api.trakt.tv/movies/trending?extended=full,images`);
        const data2 = await getTrendingData(`https://api.trakt.tv/shows/trending?extended=full,images`);
        const combinedData = combineData(data1, data2);
        loadBanner(combinedData);
        const sortedData = sortData(combinedData);
        loadSection(sortedData);
    } catch (error) {
        console.log("Some Error Occured");
    }
});

async function getTrendingData(url) {
    const apiKey = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": apiKey
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Some Error Occured");
    }
}

function combineData(data1, data2) {
    let combinedData = [];
    combinedData.push(...data1);
    combinedData.push(...data2);
    return combinedData;
}

function loadBanner(combinedData) {
    const random = Math.floor(Math.random() * combinedData.length);
    bannerContainer.style.backgroundImage = `url("https://${combinedData[random][combinedData[random].movie ? "movie" : "show"].images.fanart[0]}")`;
}

function sortData(combinedData) {
    combinedData.sort((a, b) => b.watchers - a.watchers);
    return combinedData;
}

function loadSection(sortedData) {
    trendingSection.innerHTML = "";
    for (let i = 0; i < Math.min(10,sortedData.length); i++) {
        trendingSection.innerHTML = trendingSection.innerHTML + `
        <div class="sectionCard">
            <div class="sectionCardType">${sortedData[i].movie ? "Movie" : "Series"}</div>
                <div class="sectionCardButtonContainer">
                    <button id=${sortedData[i][sortedData[i].movie ? "movie" : "show"].ids.imdb} class="sectionCardButton addToLibraryButton" title="Add to Library"><i
                                class="fa-solid fa-check"></i></button>
                    <button id=${sortedData[i][sortedData[i].movie ? "movie" : "show"].ids.imdb} class="sectionCardButton addToFavouriteButton" title="Add to Favourite"><i
                                class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
        `;
        const cards = document.getElementsByClassName('sectionCard');
        cards[i].style.backgroundImage = `url("https://${sortedData[i][sortedData[i].movie ? "movie" : "show"].images.poster[0]}")`;
    }
}