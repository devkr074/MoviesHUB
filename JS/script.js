const addDataBtn = document.getElementById("addDataBtn");
const filterCategory = document.getElementById("filterCategory");
const filterYear = document.getElementById("filterYear");
const filterMonth = document.getElementById("filterMonth");
const filterRating = document.getElementById("filterRating");
const filterReset = document.getElementById("filterReset");
const dataContainer = document.getElementById("dataContainer");
const addDataForm = document.getElementById("addDataForm");
const addDataCategory = document.getElementById("addDataCategory");
const addDataTitle = document.getElementById("addDataTitle");
const addDataSuggestion = document.getElementById("addDataSuggestion");
const addDataRating = document.getElementById("addDataRating");
const addDataRatingValue = document.getElementById("addDataRatingValue");
const addDataSubmit = document.getElementById("addDataSubmit");
const addDataCancel = document.getElementById("addDataCancel");
const addDataMessage = document.getElementById("addDataMessage");
const dataRemove = document.getElementsByClassName("dataRemove");
const monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonthsName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dataId;
let dataContent;
let dataArray;
let dataFetched;
let suggestionIndex = -1;
let addDataSuggestionList;
let dataFilteredByRating;
const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDate = date.getDate();
window.addEventListener("load", function () {
    dataArray = JSON.parse(localStorage.getItem("data")) || [];
    changeYearValues();
    let option;
    let filterCategoryValue = localStorage.getItem("filterCategory") || "All";
    if (filterCategoryValue === "All") {
        document.getElementById("filterCategoryAll").selected = true;
    } else {
        option = document.getElementById(`filter${filterCategoryValue}`);
        if (option) {
            option.selected = true;
        }
        else {
            document.getElementById("filterCategoryAll").selected = true;
            localStorage.setItem('filterCategory', 'All');
        }
    }
    let filterYearValue = localStorage.getItem("filterYear") || "All";
    if (filterYearValue === "All") {
        document.getElementById("filterYearAll").selected = true;
    } else {
        option = document.getElementById(`${filterYearValue}`);
        if (option) {
            option.selected = true;
        }
        else {
            document.getElementById("filterYearAll").selected = true;
            localStorage.setItem('filterYear', 'All');
        }
    }
    let filterMonthValue = localStorage.getItem("filterMonth") || "All";
    if (filterMonthValue === "All") {
        document.getElementById("filterMonthAll").selected = true;
    } else {
        option = document.getElementById(`${filterMonthValue}${filterMonthValue}`);
        if (option) {
            option.selected = true;
        }
        else {
            document.getElementById("filterMonthAll").selected = true;
            localStorage.setItem('filterMonth', 'All');
        }
    }
    let filterRatingValue = localStorage.getItem("filterRating") || "All";
    if (filterRatingValue === "All") {
        document.getElementById("filterRatingAll").selected = true;
    } else {
        option = document.getElementById(`${filterRatingValue}`);
        if (option) {
            option.selected = true;
        }
        else {
            document.getElementById("filterRatingAll").selected = true;
            localStorage.setItem('filterRating', 'All');
        }
    }
    displayData();
});
function changeYearValues() {
    let distinctYears = [...new Set(dataArray.map(item => new Date(item.dataContent.released).getFullYear()))];
    distinctYears.sort((a, b) => a - b);
    filterYear.innerHTML = "";
    const yearOption = document.createElement("option");
    yearOption.innerHTML = "All Year";
    yearOption.value = "All";
    yearOption.id = "filterYearAll";
    filterYear.appendChild(yearOption);
    for (let i = 0; i < distinctYears.length; i++) {
        const yearOption = document.createElement("option");
        yearOption.innerHTML = `${distinctYears[i]}`;
        yearOption.value = `${distinctYears[i]}`;
        yearOption.id = `${distinctYears[i]}`;
        filterYear.appendChild(yearOption);
    }
}
addDataBtn.addEventListener("click", function () {
    if (document.getElementById('editDataForm').classList.contains('active')) {
        document.getElementById('editDataForm').classList.add('shake');
        setTimeout(() => {
            document.getElementById('editDataForm').classList.remove('shake');
        }, 500);
        return;
    }
    if (addDataForm.classList.contains("active")) {
        addDataForm.classList.remove("active");
        addDataBtn.style.transform = 'rotate(0deg)';
    }
    else {
        addDataForm.classList.add("active");
        addDataBtn.style.transform = 'rotate(-135deg)';
    }

});
addDataRating.addEventListener("change", function () {
    addDataRatingValue.innerHTML = addDataRating.value;
});
filterCategory.addEventListener("change", function () {
    localStorage.setItem("filterCategory", filterCategory.value);
    displayData();
});
filterYear.addEventListener("change", function () {
    localStorage.setItem("filterYear", filterYear.value);
    const date = new Date();
    if (filterYear.value == date.getFullYear()) {
        filterMonth.innerHTML = "";
        const monthOption = document.createElement("option");
        monthOption.innerHTML = "All Month";
        monthOption.value = "All";
        monthOption.id = "filterMonthAll";
        filterMonth.appendChild(monthOption);
        for (let i = 0; i <= date.getMonth(); i++) {
            const monthOption = document.createElement("option");
            monthOption.innerHTML = `${fullMonthsName[i]}`;
            monthOption.value = i;
            monthOption.id = `${i}${i}`;
            filterMonth.appendChild(monthOption);
        }
    }
    else {
        filterMonth.innerHTML = "";
        const monthOption = document.createElement("option");
        monthOption.innerHTML = "All Month";
        monthOption.value = "All";
        monthOption.id = "filterMonthAll";
        filterMonth.appendChild(monthOption);
        for (let i = 0; i <= 11; i++) {
            const monthOption = document.createElement("option");
            monthOption.innerHTML = `${fullMonthsName[i]}`;
            monthOption.value = i;
            monthOption.id = `${i}${i}`;
            filterMonth.appendChild(monthOption);
        }
    }
    let filterMonthValue = localStorage.getItem("filterMonth") || "All";
    if (filterMonthValue === "All") {
        document.getElementById("filterMonthAll").selected = true;
    } else {
        let option = document.getElementById(`${filterMonthValue}${filterMonthValue}`);
        if (option) {
            option.selected = true
        }
        else {
            const date = new Date();
            const currMonth = date.getMonth();
            localStorage.setItem('filterMonth', `${currMonth}`);
            document.getElementById(`${currMonth}${currMonth}`).selected = true;
        }
    }
    displayData();
});
filterMonth.addEventListener("change", function () {
    localStorage.setItem("filterMonth", filterMonth.value);
    displayData();
});
filterRating.addEventListener("change", function () {
    localStorage.setItem("filterRating", filterRating.value);
    displayData();
});
filterReset.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("filterCategory");
    localStorage.removeItem("filterYear");
    localStorage.removeItem("filterMonth");
    localStorage.removeItem("filterRating");
    document.getElementById("filterCategoryAll").selected = true;
    document.getElementById("filterYearAll").selected = true;
    document.getElementById("filterMonthAll").selected = true;
    document.getElementById("filterRatingAll").selected = true;
    displayData();
});
["input", "focus"].forEach(event =>
    addDataTitle.addEventListener(event, async function (event) {
        const addDataCategoryValue = addDataCategory.value;
        const addDataTitleValue = event.target.value;
        if (addDataTitleValue.length >= 1) {
            const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
            const url = `https://api.trakt.tv/search/${addDataCategoryValue}?query=${encodeURIComponent(addDataTitleValue)}&extended=full,images`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "trakt-api-version": "2",
                        "trakt-api-key": clientId
                    }
                });
                if (!response.ok) {
                    addDataMessage.innerHTML = 'Some Error Occured';
                    addDataMessage.classList.add('active');
                    addDataMessage.style.background = '#dc3545';
                    setTimeout(() => {

                        addDataMessage.classList.remove('active');
                    }, 3000);
                    dataFetched = 0;
                }
                const data = await response.json();
                addDataSuggestion.innerHTML = "";
                suggestionIndex = -1;
                data.forEach(data => {
                    const addDataSuggestionList = document.createElement("div");
                    addDataSuggestionList.classList.add("addDataSuggestionList");
                    const addDataSuggestionListImage = document.createElement("img");
                    addDataSuggestionListImage.src = `https://${data[addDataCategoryValue].images.poster}`;
                    const addDataSuggestionListText = document.createElement("p");
                    addDataSuggestionListText.textContent = data[addDataCategoryValue].title;
                    addDataSuggestionList.appendChild(addDataSuggestionListImage);
                    addDataSuggestionList.appendChild(addDataSuggestionListText);
                    addDataSuggestionList.addEventListener("click", () => {
                        addDataTitle.value = data[addDataCategoryValue].title;
                        dataFetched = 1;
                        dataContent = data[addDataCategoryValue];
                        addDataSuggestion.innerHTML = "";
                        console.log(data[addDataCategoryValue]);
                    });
                    addDataSuggestion.appendChild(addDataSuggestionList);
                });
                /*🤨*/
            } catch (error) {

                addDataMessage.innerHTML = 'Some Error Occured';
                addDataMessage.classList.add('active');
                addDataMessage.style.background = '#dc3545';
                setTimeout(() => {

                    addDataMessage.classList.remove('active');
                }, 3000);
            }
        }
    })
);


addDataTitle.addEventListener("keydown", (event) => {
    const addDataSuggestionValue = document.querySelectorAll(".addDataSuggestionList");
    if (addDataSuggestionValue.length > 0) {
        if (event.key == "ArrowDown") {
            event.preventDefault();
            if (suggestionIndex == addDataSuggestionValue.length - 1) {
                suggestionIndex = addDataSuggestionValue.length - 1;
            }
            else {
                suggestionIndex = suggestionIndex + 1;
            }
            highlightSuggestion(addDataSuggestionValue);
            scrollSuggestion(addDataSuggestionValue[suggestionIndex]);
        } else if (event.key == "ArrowUp") {
            event.preventDefault();
            if (suggestionIndex == 0) {
                suggestionIndex = 0;
            }
            else {
                suggestionIndex = suggestionIndex - 1;
            }
            highlightSuggestion(addDataSuggestionValue);
            scrollSuggestion(addDataSuggestionValue[suggestionIndex]);
        } else if (event.key === "Enter") {
            event.preventDefault();
            if (suggestionIndex >= 0 && suggestionIndex < addDataSuggestionValue.length) {
                addDataSuggestionValue[suggestionIndex].click();
            }
        }
    }
});
function highlightSuggestion(addDataSuggestionList) {
    addDataSuggestionList.forEach((item, index) => {
        if (index == suggestionIndex) {
            item.classList.add("highlight");
        } else {
            item.classList.remove("highlight");
        }
    });
}
function scrollSuggestion(addDataSuggestion) {
    addDataSuggestion.scrollIntoView({ block: "nearest" });
}
addDataSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    if (dataFetched) {
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].dataContent.title == dataContent.title && dataArray[i].dataContent.tagline == dataContent.tagline && dataArray[i].dataContent.released == dataContent.released) {
                if (addDataCategory.value == 'movie') {
                    addDataMessage.innerHTML = `Movie Already Exists`;
                }
                else {
        
                    addDataMessage.innerHTML = `Series Already Exists`;
                }
                addDataMessage.classList.add('active');
                addDataMessage.style.background = '#dc3545';
                setTimeout(() => {
                    addDataMessage.classList.remove('active');
                }, 3000);
                dataFetched = 0;
                return;
            }
        }
        const releaseDate = new Date(dataContent.released || dataContent.first_aired);
        const releaseDay=releaseDate.getDate();
        const releaseYear = releaseDate.getFullYear();
        const releaseMonth = releaseDate.getMonth();
        if ((releaseYear > currentYear) || (releaseYear === currentYear && releaseMonth > currentMonth) || (releaseYear === currentYear && releaseMonth === currentMonth && releaseDay>currentDate) || ((dataContent.released || dataContent.first_aired) == null)) {
            if (addDataCategory.value == 'movie') {
                addDataMessage.innerHTML = `Movie not Released Yet`;
            }
            else {
    
                addDataMessage.innerHTML = `Series not Released Yet`;
            }
            addDataMessage.classList.add('active');
            addDataMessage.style.background = '#dc3545';
            setTimeout(() => {
                addDataMessage.classList.remove('active');
            }, 3000);
            dataFetched = 0;
            return;
        }
        dataId = localStorage.getItem("dataId") || 0;
        dataArray.push({ "dataId": dataId, "dataType": addDataCategory.value, "dataRating": addDataRating.value, "dataContent": dataContent });
        dataId++;
        localStorage.setItem("dataId", dataId);
        localStorage.setItem("data", JSON.stringify(dataArray));
        addDataTitle.value = "";
        addDataRating.value = 0;
        addDataRatingValue.innerHTML = "0";
        if (addDataCategory.value == 'movie') {
            addDataMessage.innerHTML = `Movie Added Successfully`;
        }
        else {

            addDataMessage.innerHTML = `Series Added Successfully`;
        }
        addDataMessage.classList.add('active');
        addDataMessage.style.background = '#28a745';
        setTimeout(() => {
            addDataMessage.classList.remove('active');
        }, 3000);
        dataFetched = 0;
        changeYearValues();
        displayData();
    }
});
function displayData() {
    dataContainer.innerHTML = "";
    if (dataArray.length == 0) {
        const welcomeBox = document.createElement('div');
        welcomeBox.classList.add('welcomeBox');
        const welcomeBoxText = document.createElement('p');
        welcomeBoxText.innerHTML = "Your collection is waiting to shine! Start adding your favorite movies and series now.";
        const welcomeBoxButton = document.createElement('button');
        welcomeBoxButton.innerHTML = "Add";
        welcomeBoxButton.classList.add('button');
        welcomeBoxButton.classList.add('button1');
        welcomeBox.appendChild(welcomeBoxText);
        welcomeBox.appendChild(welcomeBoxButton);
        dataContainer.appendChild(welcomeBox);
        welcomeBoxButton.addEventListener('click', function () {
            if (document.getElementById('editDataForm').classList.contains('active')) {
                document.getElementById('editDataForm').classList.add('shake');
                setTimeout(() => {
                    document.getElementById('editDataForm').classList.remove('shake');
                }, 500);
                return;
            }
            else {
                addDataForm.classList.add("active");
                addDataBtn.style.transform = 'rotate(-45deg)';
            }
        });
    }
    let dataFilteredByCategory = [];
    let dataFilteredByYear = [];
    let dataFilteredByMonth = [];
    dataFilteredByRating = [];
    if (filterCategory.value == "All") {
        dataFilteredByCategory = dataArray;
    }
    else if (filterCategory.value == "Movie") {
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].dataType == "movie") {
                dataFilteredByCategory.push(dataArray[i]);
            }
        }
    }
    else if (filterCategory.value == "Series") {
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].dataType == "show") {
                dataFilteredByCategory.push(dataArray[i]);
            }
        }
    }
    for (let i = 0; i < dataFilteredByCategory.length; i++) {
        const dataReleaseDate = new Date(dataFilteredByCategory[i].dataContent.released || dataFilteredByCategory[i].dataContent.first_aired);
        let dataYear = dataReleaseDate.getFullYear();
        if (filterYear.value == "All") {
            dataFilteredByYear = dataFilteredByCategory;
        }
        else if (dataYear == filterYear.value) {
            dataFilteredByYear.push(dataFilteredByCategory[i]);
        }
    }
    for (let i = 0; i < dataFilteredByYear.length; i++) {
        const dataReleaseDate = new Date(dataFilteredByYear[i].dataContent.released || dataFilteredByYear[i].dataContent.first_aired);
        let dataMonth = dataReleaseDate.getMonth();
        if (filterMonth.value == "All") {
            dataFilteredByMonth = dataFilteredByYear;
        }
        else if (dataMonth == filterMonth.value) {
            dataFilteredByMonth.push(dataFilteredByYear[i]);
        }
    }
    for (let i = 0; i < dataFilteredByMonth.length; i++) {
        if (filterRating.value == "All") {
            dataFilteredByRating = dataFilteredByMonth;
        }
        else if (dataFilteredByMonth[i].dataRating == filterRating.value) {
            dataFilteredByRating.push(dataFilteredByMonth[i]);
        }
    }
    dataFilteredByRating.sort((a, b) => {
        const dateA = new Date(a.dataContent.released || a.dataContent.first_aired);
        const dateB = new Date(b.dataContent.released || b.dataContent.first_aired);
        const formattedDateA = `${dateA.getFullYear()}-${String(dateA.getMonth()).padStart(2, "0")}-${String(dateA.getDate()).padStart(2, "0")}`
        const formattedDateB = `${dateB.getFullYear()}-${String(dateB.getMonth()).padStart(2, "0")}-${String(dateB.getDate()).padStart(2, "0")}`
        return formattedDateB.localeCompare(formattedDateA);
    });
    for (let i = 0; i < dataFilteredByRating.length; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        const imgElement = document.createElement("img");
        imgElement.src = `https://${dataFilteredByRating[i].dataContent.images.poster}`;
        square.appendChild(imgElement);
        const content = document.createElement("div");
        content.classList.add("content");
        const table = document.createElement('table');
        const tr1 = document.createElement('tr');
        const td1 = document.createElement('td');
        const title = document.createElement("p");
        title.innerHTML = `${dataFilteredByRating[i].dataContent.title}`;
        td1.innerHTML = 'Title';
        tr1.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerHTML = title.innerHTML;
        tr1.appendChild(td2);
        table.appendChild(tr1);
        const tr2 = document.createElement('tr');
        const td3 = document.createElement('td');
        td3.innerHTML = 'Type';
        tr2.appendChild(td3);
        const td4 = document.createElement('td');
        let category;
        if (dataFilteredByRating[i].dataType == "movie") {
            category = `Movie`;
        }
        else if (dataFilteredByRating[i].dataType == "show") {
            category = `Series`;
        }
        td4.innerHTML = category;
        tr2.appendChild(td4);
        table.appendChild(tr2);
        const tr3 = document.createElement('tr');
        const td5 = document.createElement('td');
        td5.innerHTML = 'Rating';
        tr3.appendChild(td5);
        const td6 = document.createElement('td');
        let rating;
        switch (dataFilteredByRating[i].dataRating) {
            case "0": rating = "</ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "0.5": rating = "</ion-icon><ion-icon name='star-half'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "0.5": rating = "</ion-icon><ion-icon name='star-half'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "1": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "1.5": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-half'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "2": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "2.5": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-half'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "3": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "3.5": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-half'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "4": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-outline'></ion-icon>";
                break;
            case "4.5": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star-half'></ion-icon>";
                break;
            case "5": rating = "</ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon></ion-icon><ion-icon name='star'></ion-icon>";
                break;
        }
        td6.innerHTML = rating;
        tr3.appendChild(td6);
        table.appendChild(tr3);
        const tr4 = document.createElement('tr');
        const td7 = document.createElement('td');
        td7.innerHTML = 'Release';
        tr4.appendChild(td7);
        const td8 = document.createElement('td');


        let dateToDisplay = new Date(dataFilteredByRating[i].dataContent.released || dataFilteredByRating[i].dataContent.first_aired);
        let release;
        release = `${dateToDisplay.getDate()} ${monthsName[dateToDisplay.getMonth()]} ${dateToDisplay.getFullYear()}`;
        td8.innerHTML = release;
        tr4.appendChild(td8);
        table.appendChild(tr4);
        content.appendChild(table);



        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const button1 = document.createElement("button");
        button1.classList.add("dataEdit");
        button1.innerHTML = "Edit";
        buttons.appendChild(button1);
        const button2 = document.createElement("button");
        button2.classList.add("dataRemove");
        button2.innerHTML = "Remove";
        buttons.appendChild(button2);
        content.appendChild(buttons);
        square.appendChild(content);
        dataContainer.appendChild(square);
    }
}
dataContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("dataRemove")) {
        document.getElementById('deleteWarning').classList.add('active');
        movieIndex = Array.from(document.getElementsByClassName("dataRemove")).indexOf(event.target);
        const contentIdToRemove = dataFilteredByRating[movieIndex].dataId;
        document.getElementById('removeText').innerHTML = `Do you really want to remove '${dataFilteredByRating[movieIndex].dataContent.title}'`;
        document.getElementById('removeCancel').addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('deleteWarning').classList.remove('active');
        })
        document.getElementById('removeConfirm').addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('deleteWarning').classList.remove('active');
            dataArray = dataArray.filter(data => data.dataId !== contentIdToRemove);
            localStorage.setItem("data", JSON.stringify(dataArray));
            changeYearValues();
            displayData();
        })
    }
});
let contentIdToEdit;
let initialDataType;
let initialRating;
dataContainer.addEventListener("click", function (event) {
    if (addDataForm.classList.contains('active') && !event.target.classList.contains("button1")) {
        addDataForm.classList.remove('active');
        addDataBtn.style.transform = 'rotate(0deg)';
        return;
    }
    else if (addDataForm.classList.contains('active') && event.target.classList.contains("button1")) {
        addDataForm.classList.add('shake');
        setTimeout(() => {
            addDataForm.classList.remove('shake');
        }, 500);
        return;
    }
    else if (event.target.classList.contains("button1")) {
        addDataForm.classList.add('active');
        addDataBtn.style.transform = 'rotate(-45deg)';
        return;
    }
    else if (event.target.classList.contains("dataEdit")) {
        if (addDataForm.classList.contains('active')) {
            addDataForm.classList.add('shake');
            setTimeout(() => {
                addDataForm.classList.remove('shake');
            }, 500);
            return;
        }
        const movieIndex = Array.from(document.getElementsByClassName("dataEdit")).indexOf(event.target);
        contentIdToEdit = dataFilteredByRating[movieIndex].dataId;
        const movieData = dataArray.find(data => data.dataId === contentIdToEdit);

        if (movieData) {
            // Populate the form with the movie data
            editDataForm.classList.add('active');

            document.getElementById('editDataTitle').value = movieData.dataContent.title;
            document.getElementById('editDataCategory').value = movieData.dataType;
            initialDataType = document.getElementById('editDataCategory').value;
            document.getElementById('editDataRating').value = movieData.dataRating;
            initialRating = document.getElementById('editDataRating').value;
            document.getElementById('editDataRatingValue').innerHTML =
                document.getElementById('editDataRating').value;
        }
    }
});
let timeoutId;
document.getElementById('editDataSubmit').addEventListener('click', function (event) {
    event.preventDefault();
    if (contentIdToEdit !== null) {
        const movieData = dataArray.find(data => data.dataId === contentIdToEdit);

        if (movieData) {
            // Update the movie data with the form values
            movieData.dataType = document.getElementById('editDataCategory').value;
            movieData.dataRating = document.getElementById('editDataRating').value;
            // Update other form fields as needed

            // Store the updated data array in localStorage
            localStorage.setItem("data", JSON.stringify(dataArray));
            if (movieData.dataType == initialDataType && movieData.dataRating == initialRating) {
                document.getElementById('editMessage').innerHTML = 'No Changes made';
                document.getElementById('editMessage').style.backgroundColor = '#dc3545';
            }
            else {
                initialDataType = movieData.dataType;
                initialRating = movieData.dataRating;
                document.getElementById('editMessage').innerHTML = 'Changes Saved';
                document.getElementById('editMessage').style.backgroundColor = '#28a745';
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            document.getElementById('editMessage').classList.add('active');
            timeoutId = setTimeout(() => {
                document.getElementById('editMessage').classList.remove('active');
            }, 3000);
            displayData();
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            document.getElementById('editMessage').innerHTML = `${initialDataType} has been Deleted`;
            document.getElementById('editMessage').style.backgroundColor = 'red';
            document.getElementById('editMessage').classList.add('active');
            timeoutId = setTimeout(() => {
                document.getElementById('editMessage').classList.remove('active');
            }, 3000);
        }
    }
});

document.getElementById('filterBtn').addEventListener('click', function () {
    document.getElementById('filterForm').classList.toggle('active');
})

document.getElementById('editDataCancel').addEventListener('click', function () {

    editDataForm.classList.remove('active');
})

document.getElementById('editDataRating').addEventListener('change', function () {
    document.getElementById('editDataRatingValue').innerHTML = document.getElementById('editDataRating').value;
})






