const mainContainer = document.getElementById("mainContainer");
const navbarContainer = document.getElementById("navbarContainer");
const bannerContainer = document.getElementById("bannerContainer");
let cardCounter = 0;
let sectionCard;
let sectionCardButton;

mainContainer.addEventListener("scroll", function () {
    if (mainContainer.scrollTop >= 80) {
        navbarContainer.classList.add("active");
    }
    else {
        navbarContainer.classList.remove("active");
    }
});

window.addEventListener("load", async function () {
    let data1, data2, data;
    try {
        data1 = await getData(`https://api.trakt.tv/movies/trending?extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/shows/trending?extended=full,images`);
        data = combineData(data1, data2);
        data = sortData(data, "trending");
        loadBanner(data);
        loadSection(data, "trendingSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    try {
        data1 = await getData(`https://api.trakt.tv/movies/popular?extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/shows/popular?extended=full,images`);
        data = combineData(data1, data2);
        data = sortData(data, "popular");
        loadSection(data, "popularSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    try {
        const date=new Date();
        const year=date.getFullYear();
        const month=(date.getMonth()+1).toString().padStart(2,"0");
        const day=(date.getDate()).toString().padStart(2,"0");
        data1 = await getData(`https://api.trakt.tv/calendars/movies/${year}-${month}-${day}/1?extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/calendars/shows/${year}-${month}-${day}/1?extended=full,images`);
        data = combineData(data1[`${year}-${month}-${day}`], data2[`${year}-${month}-${day}`]);
        data = sortData(data, "upcoming");
        loadSection(data, "upcomingSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    try {
        data1 = await getData(`https://api.trakt.tv/movies/anticipated?extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/shows/anticipated?extended=full,images`);
        data = combineData(data1, data2);
        data = sortData(data, "anticipated");
        loadSection(data, "anticipatedSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    addCardAndButtonsFunctionality();
});

async function getData(url) {
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
    let data = [];
    data.push(...data1);
    data.push(...data2);
    return data;
}

function sortData(data, type) {
    if (type == "trending") {
        data.sort((a, b) => b.watchers - a.watchers);
    }
    else if (type == "popular") {
        data.sort((a, b) => b.votes - a.votes);
    }
    else if (type == "upcoming") {
        data.sort((a, b) => {
            const aVotes = a.movie ? a.movie.votes : a.episode.votes;
            const bVotes = b.movie ? b.movie.votes : b.episode.votes;
            return bVotes - aVotes;
        });
    }
    else if (type == "anticipated") {
        data.sort((a, b) => b.list_count - a.listCount);
    }
    return data;
}

function loadBanner(data) {
    const random = Math.floor(Math.random() * data.length);
    bannerContainer.style.backgroundImage = `url("https://${data[random][data[random].movie ? "movie" : "show"].images.fanart[0]}")`;
}

function loadSection(data, id) {
    const section = document.getElementById(id);
    section.innerHTML = "";
    if (id == "trendingSection" || id == "upcomingSection" || id == "anticipatedSection") {
        for (let i = 0; i < Math.min(10, data.length); i++) {
            section.innerHTML = section.innerHTML +
                `<div class="sectionCard">
                    <div class="sectionCardType">${data[i].movie ? "Movie" : data[i].episode ? "Episode" : "Series"}</div>
                    <div class="sectionCardButtonContainer">
                        <button id=${data[i][data[i].movie ? "movie" : "show"].ids.imdb} class="sectionCardButton addToLibraryButton" title="Add to Library"><i class="fa-solid fa-check"></i></button>
                        <button id=${data[i][data[i].movie ? "movie" : "show"].ids.imdb} class="sectionCardButton addToFavouriteButton" title="Add to Favourite"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>`;
            const cards = document.getElementsByClassName("sectionCard");
            cards[cardCounter].id = `${data[i][data[i].movie ? "movie" : data[i].episode ? "episode" : "show"].ids.imdb}`;
            cards[cardCounter].style.backgroundImage = `url("https://${data[i][data[i].movie ? "movie" : "show"].images.poster[0]}")`;
            cardCounter++;
        }
    }
    else if (id == "popularSection") {
        for (let i = 0; i < Math.min(10, data.length); i++) {
            section.innerHTML = section.innerHTML +
                `<div class="sectionCard">
                    <div class="sectionCardType">${data[i].first_aired ? "Series" : "Movie"}</div>
                    <div class="sectionCardButtonContainer">
                        <button id=${data[i].ids.imdb} class="sectionCardButton addToLibraryButton" title="Add to Library"><i class="fa-solid fa-check"></i></button>
                        <button id=${data[i].ids.imdb} class="sectionCardButton addToFavouriteButton" title="Add to Favourite"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>`;
            const cards = document.getElementsByClassName("sectionCard");
            cards[cardCounter].id = `${data[i].ids.imdb}`;
            cards[cardCounter].style.backgroundImage = `url("https://${data[i].images.poster[0]}")`;
            cardCounter++;
        }
    }
}

function addCardAndButtonsFunctionality() {
    sectionCard = document.getElementsByClassName("sectionCard");
    sectionCardButton = document.getElementsByClassName("sectionCardButton");
    for (let i = 0; i < sectionCard.length; i++) {
        sectionCard[i].addEventListener("click", function (event) {
            if ((!event.target.classList.contains("sectionCardButton")) && (!event.target.classList.contains("fa-solid"))) {
                console.log("Hello");
            }
        });
    }
    for (let i = 0; i < sectionCardButton.length; i++) {
        sectionCardButton[i].addEventListener("click", function () {
            if (sectionCardButton[i].classList.contains("addToLibraryButton")) {
                sectionCardButton[i].title = "Remove from Library";
                sectionCardButton[i].classList.add("removeFromLibraryButton");
                sectionCardButton[i].classList.remove("addToLibraryButton");
            } else if (sectionCardButton[i].classList.contains("removeFromLibraryButton")) {
                sectionCardButton[i].title = "Add to Library";
                sectionCardButton[i].classList.add("addToLibraryButton");
                sectionCardButton[i].classList.remove("removeFromLibraryButton");
            }
            else if (sectionCardButton[i].classList.contains("addToFavouriteButton")) {
                sectionCardButton[i].title = "Remove from Favourite";
                sectionCardButton[i].classList.add("removeFromFavouriteButton");
                sectionCardButton[i].classList.remove("addToFavouriteButton");
            } else if (sectionCardButton[i].classList.contains("removeFromFavouriteButton")) {
                sectionCardButton[i].title = "Add to Favourite";
                sectionCardButton[i].classList.add("addToFavouriteButton");
                sectionCardButton[i].classList.remove("removeFromFavouriteButton");
            }
        });
    }
}