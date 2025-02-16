const searchContainer = document.getElementById("searchContainer");
const searchBar = document.getElementById("searchBar");
const searchBarErrorMessage = document.getElementById("searchBarErrorMessage");
const searchBarClearButton = document.getElementById("searchBarClearButton");
const searchContainerCloseButton = document.getElementById("searchContainerCloseButton");
const searchResultContainer = document.getElementById("searchResultContainer");
const mainContainer = document.getElementById("mainContainer");
const navbarContainer = document.getElementById("navbarContainer");
const navbarMenuContainerSearchButton = document.getElementById("navbarMenuContainerSearchButton");

window.addEventListener("keydown", function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

searchBar.addEventListener("keyup", async function (event) {
    searchBarErrorMessage.style.display = "none"
    if (searchBar.value == "") {
        clearButton.style.display = "none";
    }
    else {
        clearButton.style.display = "block";
    }
    if (event.key == "Enter") {
        if (searchBar.value.trim() == "") {
            searchBarErrorMessage.style.display = "block"
        }
        else {
            searchBar.blur();
            data1 = await getData(`https://api.trakt.tv/search/movie?query=${searchBar.value.trim()}&extended=full,images`);
            data2 = await getData(`https://api.trakt.tv/search/show?query=${searchBar.value.trim()}&extended=full,images`);
            data = combineData(data1, data2);
            data = sortData(data, "search");
            loadSection(data, "searchResultContainer");
            console.log(data);
        }
    }
});

searchBarClearButton.addEventListener("click", function () {
    searchBar.value = "";
    searchBar.focus();
    searchBarErrorMessage.style.display = "none"
    searchBarClearButton.style.display = "none";
});

searchContainerCloseButton.addEventListener("click", function () {
    searchContainer.classList.remove("active");
});

mainContainer.addEventListener("scroll", function () {
    if (mainContainer.scrollTop >= 80) {
        navbarContainer.classList.add("active");
    }
    else {
        navbarContainer.classList.remove("active");
    }
});

navbarMenuContainerSearchButton.addEventListener("click", function () {
    searchContainer.classList.add("active");
    searchBar.focus();
});