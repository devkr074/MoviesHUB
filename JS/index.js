const title = document.getElementById("title");
const submitBtn = document.getElementById("basic-addon1");
const category=document.getElementById('category');
const container=document.getElementById('search-result-container');

let releaseMon=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];



async function fetchData(searchTerm) {

    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/search/${category.value}?query=${searchTerm}&extended=full,images`;
    const searchLogo=document.querySelector('.fa-solid');
    searchLogo.classList.add('d-none');
    const loaderContainer = document.querySelector('.spinner-grow');
    loaderContainer.classList.remove('d-none');

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
            console.log("Some Error Occured");
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        container.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            createCard(data[i]);
        }
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        loaderContainer.classList.add('d-none');
        searchLogo.classList.remove('d-none');
    }
}



function createCard(data) {
    let cat=category.value;
    const release=new Date(data[cat].released || data[cat].first_aired);
    const releaseDate=release.getDate();
    const releaseMonth=release.getMonth();
    const releaseYear=release.getFullYear();
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 p-1';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card border-0 position-relative';
    const img = document.createElement('img');
    img.className = 'rounded card-img-top';
    img.src = `https://${data[cat].images.poster}`;
    img.height = 210;
    img.alt = '...';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body p-0';
    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail d-flex justify-content-between p-1 rounded bg-secondary text-white my-1';
    const likesSmall = document.createElement('small');
    likesSmall.style.fontSize = '12px';
    likesSmall.innerHTML =`<i class="fa-solid fa-heart"></i> ${data[cat].rating.toFixed(1)}`;
    const dateSmall = document.createElement('small');
    dateSmall.style.fontSize = '12px';
    dateSmall.textContent = `${releaseDate}, ${releaseMon[releaseMonth]} ${releaseYear}`;
    detailDiv.appendChild(likesSmall);
    detailDiv.appendChild(dateSmall);
    const h5 = document.createElement('h6');
    h5.className = 'px-1';
    const link = document.createElement('a');
    link.href = 'detail';
    link.textContent = data[cat].title;
    h5.appendChild(link);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary position-absolute top-0 rounded-circle';
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#exampleModal';
    button.textContent = '+';
    cardBody.appendChild(detailDiv);
    cardBody.appendChild(h5);
    cardBody.appendChild(button);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    container.appendChild(colDiv);
}




function getSearchTerm() {
    let search = title.value.trim();
    if (search == "") {
        console.log("Error");
    }
    else {
        fetchData(search);
    }
}

title.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        getSearchTerm();
    }
})

submitBtn.addEventListener("click", function () {
    getSearchTerm();
})