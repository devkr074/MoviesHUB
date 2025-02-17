const loaderContainer = document.getElementById("loaderContainer");
const bannerContainer = document.getElementById("bannerContainer");
let cardCounter = 0;
let sectionCard;
let sectionCardButton;
let library;
let favourite;

window.addEventListener("load", async function () {
    let data1, data2, data;
    library = JSON.parse(localStorage.getItem("library")) || [];
    favourite = JSON.parse(localStorage.getItem("favourite")) || [];
    try {
        data1 = await getData(`https://api.trakt.tv/movies/trending?countries=in&extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/shows/trending?countries=in&extended=full,images`);
        data = combineData(data1, data2);
        data = sortData(data, "trending");
        loadBanner(data);
        console.log(data);
        loadSection(data, "trendingSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    try {
        data1 = await getData(`https://api.trakt.tv/movies/popular?countries=in&extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/shows/popular?countries=in&extended=full,images`);
        data = combineData(data1, data2);
        data = sortData(data, "popular");
        console.log(data);
        loadSection(data, "popularSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = (date.getDate()).toString().padStart(2, "0");
        data1 = await getData(`https://api.trakt.tv/calendars/all/movies/2025-06-27/1?languages=ko&extended=full,images`);
        console.log(data1);
        data2 = await getData(`https://api.trakt.tv/calendars/all/shows/premieres/2025-06-27/1?languages=ko&extended=full,images`);
        console.log(data2);
        data = combineData(data1, data2);
        data = sortData(data, "upcoming");
        console.log(data);
        loadSection(data, "upcomingSection");
    } catch (error) {
        console.error(error);
    }
    try {
        data1 = await getData(`https://api.trakt.tv/movies/anticipated?extended=full,images`);
        data2 = await getData(`https://api.trakt.tv/shows/anticipated?extended=full,images`);
        data = combineData(data1, data2);
        data = sortData(data, "anticipated");
        console.log(data);
        loadSection(data, "anticipatedSection");
    } catch (error) {
        console.log("Some Error Occured");
    }
    addCardAndButtonsFunctionality();
    changeClasses();
});

async function getData(url) {
    const apiKey = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    mainContainer.style.filter = "blur(20px)";
    loaderContainer.style.display = "flex";
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
    finally {
        mainContainer.style.filter = "none";
        loaderContainer.style.display = "none";
    }
}

function combineData(data1, data2) {
    let data = [];
    data.push(...data1);
    data.push(...data2);
    return data;
}

function sortData(data, type) {
    if (type == "popular") {
        data.sort((a, b) => b.rating - a.rating);
    }
    else {
        data.sort((a, b) => {
            const aVotes = a.movie ? a.movie.rating : a.show.rating;
            const bVotes = b.movie ? b.movie.rating : b.show.rating;
            return bVotes - aVotes;
        });
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
                    <p class="sectionCardType">${data[i].movie ? "Movie" : data[i].episode ? "Episode" : "Series"}</p>
                    <div class="sectionCardButtonContainer">
                        <button id=${data[i][data[i].movie ? "movie" : data[i].episode ? "episode" : "show"].ids.imdb} class="sectionCardButton addToLibraryButton" title="Add to Library"><i class="fa-solid fa-check"></i></button>
                        <button id=${data[i][data[i].movie ? "movie" : data[i].episode ? "episode" : "show"].ids.imdb} class="sectionCardButton addToFavouriteButton" title="Add to Favourite"><i class="fa-solid fa-heart"></i></button>
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
                    <p class="sectionCardType">${data[i].first_aired ? "Series" : "Movie"}</p>
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
                localStorage.setItem("redirectId", sectionCard[i].id);
                console.log(localStorage.getItem("redirectId"));
                window.open("detail.html", "_blank");
            }
        });
    }
    for (let i = 0; i < sectionCardButton.length; i++) {
        sectionCardButton[i].addEventListener("click", function () {
            if (sectionCardButton[i].classList.contains("addToLibraryButton")) {
                sectionCardButton[i].title = "Remove from Library";
                sectionCardButton[i].classList.add("removeFromLibraryButton");
                sectionCardButton[i].classList.remove("addToLibraryButton");
                library.push(sectionCardButton[i].id);
                localStorage.setItem("library", JSON.stringify(library));
            } else if (sectionCardButton[i].classList.contains("removeFromLibraryButton")) {
                sectionCardButton[i].title = "Add to Library";
                sectionCardButton[i].classList.add("addToLibraryButton");
                sectionCardButton[i].classList.remove("removeFromLibraryButton");
                library = library.filter(item => item !== sectionCardButton[i].id);
                localStorage.setItem("library", JSON.stringify(library));
            }
            else if (sectionCardButton[i].classList.contains("addToFavouriteButton")) {
                sectionCardButton[i].title = "Remove from Favourite";
                sectionCardButton[i].classList.add("removeFromFavouriteButton");
                sectionCardButton[i].classList.remove("addToFavouriteButton");
                favourite.push(sectionCardButton[i].id);
                localStorage.setItem("favourite", JSON.stringify(favourite));
            } else if (sectionCardButton[i].classList.contains("removeFromFavouriteButton")) {
                sectionCardButton[i].title = "Add to Favourite";
                sectionCardButton[i].classList.add("addToFavouriteButton");
                sectionCardButton[i].classList.remove("removeFromFavouriteButton");
                favourite = favourite.filter(item => item !== sectionCardButton[i].id);
                localStorage.setItem("favourite", JSON.stringify(favourite));
            }
        });
    }
}

function changeClasses() {
    for (let i = 0; i < sectionCardButton.length; i++) {
        if (library.includes(sectionCardButton[i].id) && sectionCardButton[i].classList.contains("addToLibraryButton")) {
            sectionCardButton[i].title = "Remove from Library";
            sectionCardButton[i].classList.add("removeFromLibraryButton");
            sectionCardButton[i].classList.remove("addToLibraryButton");
        }
        else if (favourite.includes(sectionCardButton[i].id) && sectionCardButton[i].classList.contains("addToFavouriteButton")) {
            sectionCardButton[i].title = "Remove from Favourite";
            sectionCardButton[i].classList.add("removeFromFavouriteButton");
            sectionCardButton[i].classList.remove("addToFavouriteButton");
        }
    }
}