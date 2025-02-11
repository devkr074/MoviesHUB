let data;
let data2;
let data3;
async function fetchData() {
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/movies/trending?extended=full,images`;
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
            throw new Error("Network response was not ok");
        }
        data = await response.json();
        createCard();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Finished');
    }
}


async function fetchData2() {
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/movies/popular?extended=full,images`;
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
            throw new Error("Network response was not ok");
        }
        data2 = await response.json();
        createPopularCard();
        console.log(data2);
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Finished');
    }
}

async function fetchData3() {
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/movies/anticipated?extended=full,images`;
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
            throw new Error("Network response was not ok");
        }
        data3 = await response.json();
        createAnticipatedCard();
        console.log(data3);
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Finished');
    }
}


let localData;

window.addEventListener('load', function () {
    localData = JSON.parse(localStorage.getItem('localData')) || [];
    fetchData();
    fetchData2();
    fetchData3();
    console.log(localData);
})

const cont = document.getElementById('cont');

cont.addEventListener('scroll', function () {
    if (this.scrollTop > 100) {
        document.getElementById('nav').classList.add('active');
    }
    else {
        document.getElementById('nav').classList.remove('active');
    }
})


function createCard() {
    document.getElementById('container').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        // Create the img element
        const img = document.createElement('img');
        img.src = `https://${data[i].movie.images.poster[0]}`;
        img.alt = '';

        // Create the span element
        const span = document.createElement('span');
        span.textContent = `${i + 1}`;
        const button = document.createElement('button');
        const check = data[i].movie.ids.slug;
        if (localData.includes(check)) {

            button.innerHTML = 'x';
            button.id = `${data[i].movie.ids.slug}`;
            button.classList.add('remove', 'move');
        }

        else {

            button.innerHTML = '+';
            button.id = `${data[i].movie.ids.slug}`;
            button.classList.add('add', 'move');
        }

        // Append img and span to the card div
        card.appendChild(img);
        card.appendChild(span);
        card.appendChild(button);
        // Append the card to the container
        const container = document.getElementById('container');
        container.appendChild(card);
    }

    kuchBhi();

}


function kuchBhi() {

    const getElement = document.getElementsByClassName('move');
    for (let i = 0; i < getElement.length; i++) {
        getElement[i].addEventListener('click', function () {
            if (getElement[i].classList.contains('add')) {
                localData.push(getElement[i].id);
                localStorage.setItem('localData', JSON.stringify(localData));
                getElement[i].classList.add('remove');
                getElement[i].classList.remove('add');
                getElement[i].innerHTML = 'x';
                getElement[i].title = 'Remove From Watchlist';
            }
            else if (getElement[i].classList.contains('remove')) {
                localData = localData.filter(function (value) {
                    return value != getElement[i].id;
                });
                localStorage.setItem('localData', JSON.stringify(localData));
                getElement[i].classList.add('add');
                getElement[i].classList.remove('remove');
                getElement[i].innerHTML = '+';
                getElement[i].title = 'Add to Watchlist';
            }
        })
    }

}


function createPopularCard() {
    for (let i = 0; i < data2.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        // Create the img element
        const img = document.createElement('img');
        img.src = `https://${data2[i].images.poster[0]}`;
        img.alt = '';

        // Create the span element
        const span = document.createElement('span');
        span.textContent = `${i + 1}`;

        // Append img and span to the card div
        card.appendChild(img);
        card.appendChild(span);

        // Append the card to the container
        const container = document.getElementById('popular-container');
        container.appendChild(card);
    }

}


function createAnticipatedCard() {
    for (let i = 0; i < data3.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        // Create the img element
        const img = document.createElement('img');
        img.src = `https://${data3[i].movie.images.poster[0]}`;
        img.alt = '';

        // Create the span element
        const span = document.createElement('span');
        span.textContent = `${i + 1}`;

        // Append img and span to the card div
        card.appendChild(img);
        card.appendChild(span);

        // Append the card to the container
        const container = document.getElementById('anticipated');
        container.appendChild(card);
    }

}

const menu = document.getElementById('menu');
document.getElementById('open-menu').addEventListener('click', function () {
    menu.classList.add('active');
})

document.getElementById('close-menu').addEventListener('click', function () {
    menu.classList.remove('active');
})


const search = document.getElementById('search-container');
document.getElementById('open-search').addEventListener('click', function () {
    search.classList.add('active');
})

document.getElementById('close-search').addEventListener('click', function () {
    search.classList.remove('active');
})