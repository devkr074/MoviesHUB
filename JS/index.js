const title = document.getElementById("title");
const submitBtn = document.getElementById("basic-addon1");
const category=document.getElementById('category');
const container=document.getElementById('search-result-container');

let data;
let releaseMon=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


document.getElementById('toggle').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('nav-list').classList.toggle('active');
    this.classList.toggle('active');
})
document.getElementById('search').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('search-container').classList.add('active');
})



document.getElementById('tt').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('main-container').scrollTop = 0;
})

async function fetchData(searchTerm) {
let movie='movie';
let show='show';
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/search?limit=20&query=${searchTerm}&extended=full,images`;
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

        data = await response.json();
        container.innerHTML = '';
            createCard();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        loaderContainer.classList.add('d-none');
        searchLogo.classList.remove('d-none');
    }
}



function createCard() {
    
    for(let i=0;i<data.length;i++)
    {
    const release=new Date(data[i].type.released || data[i].type.first_aired);
    const releaseDate=release.getDate();
    const releaseMonth=release.getMonth();
    const releaseYear=release.getFullYear();
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 p-1';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card border-0 position-relative';
    const img = document.createElement('img');
    img.loading='lazy';
    img.className = 'rounded card-img-top';
    img.src = `https://`;
    img.height = 210;
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body p-0';
    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail d-flex justify-content-between p-1 rounded bg-secondary text-white my-1';
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary rounded-circle';
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#exampleModal';
    button.textContent = '+';
    const likesSmall = document.createElement('div');
likesSmall.appendChild(button);
    const dateSmall = document.createElement('small');
    dateSmall.style.fontSize = '12px';
    dateSmall.textContent = `${releaseDate}, ${releaseMon[releaseMonth]} ${releaseYear}`;
    detailDiv.appendChild(likesSmall);
    detailDiv.appendChild(dateSmall);
    const h5 = document.createElement('h6');
    h5.className = 'px-1';
    const link = document.createElement('a');
    link.href = 'detail';
    link.textContent = data[i].type.title;
    h5.appendChild(link);
    cardBody.appendChild(detailDiv);
    cardBody.appendChild(h5);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    container.appendChild(colDiv);
}
const addBtns=document.getElementsByClassName('btn');
    for(let i=0;i<addBtns.length;i++){
        addBtns[i].addEventListener('click',function(){
            addDataFun(i);
        })
    }
}

const submitData=document.getElementById('submitData');
const exampleModalLabel=document.getElementById('exampleModalLabel');
function addDataFun(index){
    exampleModalLabel.innerHTML="Rate "+data[index][category.value].title;
}

let rating;

const stars=document.getElementsByClassName('star');
for(let i=0;i<stars.length;i++){
    stars[i].addEventListener('click',function(){
        for(let k=0;k<stars.length;k++){
            stars[k].style.fill='#fff';
        }
        for(let j=0;j<=i;j++){
            stars[j].style.fill="yellow";
        }
        if(i%2==0){
            rating=i*0.5+0.5;
        }
        else{
            rating=(i+1)/2;
        }
        console.log(rating);
    })
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