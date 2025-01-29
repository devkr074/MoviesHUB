const addMovieBtn = document.getElementById('addMovieBtn');
const filterCategory = document.getElementById('filter-category');
const filterYear = document.getElementById('filter-year');
const filterMonth = document.getElementById('filter-month');
const filterRating = document.getElementById('filter-rating');
const movieContainer = document.getElementById('movie-container');
const addMovieForm = document.getElementById('add-movieForm');
const addMovieCategory = document.getElementById('add-movie-category');
const addMovieTitle = document.getElementById('name');
const addMovieRating = document.getElementById('add-movie-rating');
const addMovieRatingValue = document.getElementById('add-movie-ratingValue');
const posterBtn = document.getElementById('poster-btn');
const addMovieSubmitBtn = document.getElementById('add-movie-submitBtn');
const addMovieCancelBtn = document.getElementById('add-movie-cancelBtn');
const addMovieErrorMessage = document.getElementById('error-message');
const removeBtn = document.getElementsByClassName('remove-btn');
const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthsName = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let dataContent;
let dataId;
let dataFetched;
let dataArray;
let currentIndex = -1;

let suggestionsBox;

let moviesFilteredByRating;
addMovieRating.addEventListener('change', function () {
    addMovieRatingValue.innerHTML = addMovieRating.value;
})
addMovieBtn.addEventListener('click', function () {
    addMovieForm.classList.add('active');
})
addMovieCancelBtn.addEventListener('click', function () {
    addMovieForm.classList.remove('active');
})



/*

Data Fetching Logic Start 

*/







const inputElement = document.getElementById('name');

['input', 'focus'].forEach(event =>
    inputElement.addEventListener(event, async function (event) {
        const searchTerm = event.target.value;
        if (searchTerm.length == 0) {
            const sug = document.getElementById('suggestions');
            sug.innerHTML = '';
            sug.style.border = 'none';
        }
        else if (searchTerm.length >= 1) {
            const type = addMovieCategory.value;
            const clientId = 'cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8';
            const url = `https://api.trakt.tv/search/${type}?query=${encodeURIComponent(searchTerm)}&extended=full,images`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'trakt-api-version': '2',
                        'trakt-api-key': clientId
                    }
                });
                if (!response.ok) {
                    addMovieErrorMessage.innerHTML = "Some Error Occured! Please try again";
                } else {
                    addMovieErrorMessage.innerHTML = "";
                }
                const data = await response.json();
                suggestionsBox = document.getElementById('suggestions');
                suggestionsBox.style.border = '1px solid #ccc';
                suggestionsBox.innerHTML = '';
                suggestionIndex = -1;
                dataFetched = 0;
                if (data.length >= 1) {
                    dataFetched = 1;
                    dataContent = data[0][type];
                    console.log(data);
                }
                data.forEach(data => {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('suggestion');
                    const suggestionImage = document.createElement('img');
                    const suggestionImageLink = `https://${data[type].images.poster}`;
                    suggestionImage.src = suggestionImageLink;
                    const suggestionText = document.createElement('p');
                    suggestionText.textContent = data[type].title;
                    suggestion.appendChild(suggestionImage);
                    suggestion.appendChild(suggestionText);
                    suggestion.addEventListener('click', () => {
                        addMovieTitle.value = data[type].title;
                        dataFetched = 1;
                        dataContent = data[type];
                        console.log(data);
                        suggestionsBox.innerHTML = '';
                    });
                    suggestionsBox.appendChild(suggestion);
                });
            } catch (error) {
                addMovieErrorMessage.innerHTML = 'Some Error Occured! Please try again';
            }
        }
    })
);



addMovieTitle.addEventListener('keydown', (event) => {
    const suggestions = document.querySelectorAll('.suggestion');
    if (suggestions.length > 0) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (currentIndex == suggestions.length - 1) {
                currentIndex = suggestions.length - 1;
            }
            else {

                currentIndex = currentIndex + 1;
            }
            updateHighlight(suggestions);
            scrollToSuggestion(suggestions[currentIndex]);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (currentIndex == 0) {
                currentIndex = 0;
            }
            else {

                currentIndex = currentIndex - 1;
            }
            updateHighlight(suggestions);
            scrollToSuggestion(suggestions[currentIndex]);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (currentIndex >= 0 && currentIndex < suggestions.length) {
                suggestions[currentIndex].click();
            }
        }
    }
});


function scrollToSuggestion(element) {
    element.scrollIntoView({ block: 'nearest' });
}

function updateHighlight(suggestions) {
    suggestions.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('highlight');
        } else {
            item.classList.remove('highlight');
        }
    });
}




/*

Data Fetching Logic End

*/




/*

Data Adding Logic Start

*/




addMovieSubmitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    suggestionsBox.innerHTML = "";
    if (dataFetched) {
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].dataContent.title == dataContent.title) {
                addMovieErrorMessage.innerHTML = "Movie Already Exists";
                dataFetched = 0;
                return;
            }
        }
        dataId = localStorage.getItem("dataId") || 0;
        dataArray.push({ "dataId": dataId, "dataType": addMovieCategory.value, "dataRating": addMovieRating.value, "dataContent": dataContent });
        dataId++;
        localStorage.setItem("dataId", dataId);
        localStorage.setItem("data", JSON.stringify(dataArray));
        console.log(localStorage);
        console.log(dataArray);
        addMovieTitle.value = "";
        addMovieRating.value = 0;
        addMovieRatingValue.innerHTML = "0";
        addMovieErrorMessage.innerHTML = "Movie Added Successfully";
        dataFetched = 0;
        refreshDisplay();
    }
    else {
        addMovieErrorMessage.innerHTML = "Please Enter Valid Title";
        return;
    }
});



/*

Data Adding Logic End

*/



window.addEventListener('load', function () {

    dataArray = JSON.parse(localStorage.getItem('data')) || [];
    let newYearOption;
    filterYear.innerHTML = '';
    newYearOption = document.createElement('option');
    newYearOption.value = 'Year';
    newYearOption.innerHTML = 'Year';
    filterYear.appendChild(newYearOption);
    let distinctValues = [...new Set(movies.map(item => item.releaseDate.year))];
    distinctValues.sort();
    for (let i = 0; i < distinctValues.length; i++) {
        newYearOption = document.createElement('option');
        newYearOption.value = `${distinctValues[i]}`;
        newYearOption.innerHTML = distinctValues[i];
        filterYear.appendChild(newYearOption);
    }
    refreshDisplay();
});
/*


filterCategory.addEventListener('change', function () {
    refreshDisplay();
});



filterYear.addEventListener('change', function () {
    const date = new Date();
    if (filterYear.value == date.getFullYear()) {
        filterMonth.innerHTML = '';
        const monthOption = document.createElement('option');
        monthOption.innerHTML = 'Month';
        monthOption.value = 'All';
        filterMonth.appendChild(monthOption);
        for (let i = 0; i <= date.getMonth(); i++) {
            const monthOption = document.createElement('option');
            monthOption.innerHTML = `${fullMonthsName[i]}`;
            monthOption.value = i;
            filterMonth.appendChild(monthOption);
        }
    }
    else {
        filterMonth.innerHTML = '';
        const monthOption = document.createElement('option');
        monthOption.innerHTML = 'Month';
        monthOption.value = 'All';
        filterMonth.appendChild(monthOption);
        for (let i = 0; i <= 11; i++) {
            const monthOption = document.createElement('option');
            monthOption.innerHTML = `${fullMonthsName[i]}`;
            monthOption.value = i;
            filterMonth.appendChild(monthOption);
        }
    }
    refreshDisplay();
});
filterMonth.addEventListener('change', function () {
    refreshDisplay();
});

filterRating.addEventListener('change', function () {
    refreshDisplay();
});
function refreshDisplay() {

    movieContainer.innerHTML = '';
    let moviesFilteredByCategory = [];
    let moviesFilteredByYear = [];
    let moviesFilteredByMonth = [];
    moviesFilteredByRating = [];
    if (filterCategory.value == 'All') {
        moviesFilteredByCategory = movies;
    }
    else if (filterCategory.value == 'Movie') {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].category == 'Movie') {
                moviesFilteredByCategory.push(movies[i]);
            }
        }
    }
    else if (filterCategory.value == 'Series') {
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].category == 'Series') {
                moviesFilteredByCategory.push(movies[i]);
            }
        }
    }





    for (let i = 0; i < moviesFilteredByCategory.length; i++) {
        if (filterYear.value == 'Year') {
            moviesFilteredByYear = moviesFilteredByCategory;
        }
        else if (moviesFilteredByCategory[i].releaseDate.year == filterYear.value) {
            moviesFilteredByYear.push(moviesFilteredByCategory[i]);
        }
    }



    for (let i = 0; i < moviesFilteredByYear.length; i++) {
        if (filterMonth.value == 'All') {
            moviesFilteredByMonth = moviesFilteredByYear;
        }
        else if (moviesFilteredByYear[i].releaseDate.month == filterMonth.value) {
            moviesFilteredByMonth.push(moviesFilteredByYear[i]);
        }
    }


    for (let i = 0; i < moviesFilteredByMonth.length; i++) {
        if (filterRating.value == 'All') {
            moviesFilteredByRating = moviesFilteredByMonth;
        }
        else if (moviesFilteredByMonth[i].rating == filterRating.value) {
            moviesFilteredByRating.push(moviesFilteredByMonth[i]);
        }
    }

    moviesFilteredByRating.sort((a, b) => {
        const dateA = `${a.releaseDate.year}-${String(a.releaseDate.month).padStart(2, '0')}-${String(a.releaseDate.date).padStart(2, '0')}`;
        const dateB = `${b.releaseDate.year}-${String(b.releaseDate.month).padStart(2, '0')}-${String(b.releaseDate.date).padStart(2, '0')}`;
        return dateB.localeCompare(dateA);
    });




    for (let i = 0; i < moviesFilteredByRating.length; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        const imgElement = document.createElement('img');
        imgElement.src = moviesFilteredByRating[i].poster;
        square.appendChild(imgElement);
        const content = document.createElement('div');
        content.classList.add('content');
        const title = document.createElement('p');
        title.innerHTML = `Title: ${moviesFilteredByRating[i].title}`;
        content.appendChild(title);
        const category = document.createElement('p');
        category.innerHTML = `Category: ${moviesFilteredByRating[i].category}`;
        content.appendChild(category);
        const rating = document.createElement('p');
        switch (moviesFilteredByRating[i].rating) {
            case '0': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '0.5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star-half"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '0.5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star-half"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '1': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '1.5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-half"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '2': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '2.5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-half"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '3': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '3.5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-half"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '4': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-outline"></ion-icon>';
                break;
            case '4.5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star-half"></ion-icon>';
                break;
            case '5': rating.innerHTML = 'Rating: </ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon></ion-icon><ion-icon name="star"></ion-icon>';
                break;
        }
        content.appendChild(rating);
        const release = document.createElement('p');
        release.innerHTML = `Release: ${moviesFilteredByRating[i].releaseDate.date} ${monthsName[moviesFilteredByRating[i].releaseDate.month]} ${moviesFilteredByRating[i].releaseDate.year}`;
        content.appendChild(release);
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const button1 = document.createElement('button');
        button1.classList.add('edit-btn');
        button1.innerHTML = 'Edit';
        buttons.appendChild(button1);
        const button2 = document.createElement('button');
        button2.classList.add('remove-btn');
        button2.innerHTML = 'Remove';
        buttons.appendChild(button2);
        content.appendChild(buttons);
        square.appendChild(content);
        movieContainer.appendChild(square);
    }
}


movieContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-btn')) {
        movieIndex = Array.from(document.getElementsByClassName('remove-btn')).indexOf(event.target);
        const contentIdToRemove = moviesFilteredByRating[movieIndex].contentId;
        movies = movies.filter(movie => movie.contentId !== contentIdToRemove);
        localStorage.setItem('data', JSON.stringify(movies));
        refreshDisplay();
    }
});*/