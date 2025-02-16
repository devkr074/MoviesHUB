const libraryContainer = document.getElementById("libraryContainer");
let library;
let favourite;
let data = [];
let cardCounter = 0;
let sectionCard;
let sectionCardButton;
window.addEventListener("load", async function () {
    library = JSON.parse(localStorage.getItem("library")) || [];
    favourite = JSON.parse(localStorage.getItem("favourite")) || [];
    for (let i = 0; i < library.length; i++) {
        await getData(library[i]);
    }
    displayData();
})

async function getData(id) {
    const url = `https://api.trakt.tv/search/imdb/${id}?extended=full,images`;
    const apiKey = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": apiKey
            }
        });
        const dat = await response.json();
        data.push(...dat);
    } catch (error) {
        console.log("Some Error Occured");
    }
}

function displayData() {
    libraryContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        libraryContainer.innerHTML = libraryContainer.innerHTML +
            `<div class="sectionCard libraryCard">
                    <p class="sectionCardType">${data[i].movie ? "Movie" : data[i].episode ? "Episode" : "Series"}</p>
                    <div class="sectionCardButtonContainer">
                        <button id=${data[i][data[i].movie ? "movie" : data[i].episode ? "episode" : "show"].ids.imdb} class="sectionCardButton addToLibraryButton" title="Add to Library"><i class="fa-solid fa-check"></i></button>
                        <button id=${data[i][data[i].movie ? "movie" : data[i].episode ? "episode" : "show"].ids.imdb} class="sectionCardButton addToFavouriteButton" title="Add to Favourite"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>`;
        const cards = document.getElementsByClassName("libraryCard");
        cards[cardCounter].id = `${data[i][data[i].movie ? "movie" : data[i].episode ? "episode" : "show"].ids.imdb}`;
        cards[cardCounter].style.backgroundImage = `url("https://${data[i][data[i].movie ? "movie" : "show"].images.poster[0]}")`;
        cardCounter++;
    }
    addCardAndButtonsFunctionality();
    changeClasses();
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