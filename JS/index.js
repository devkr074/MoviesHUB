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



window.addEventListener('load',function(){
    fetchData();
    fetchData2();
    fetchData3();
})

const cont=document.getElementById('cont');

cont.addEventListener('scroll',function(){
    if(this.scrollTop>100){
        document.getElementById('nav').classList.add('active');
    }
    else{
        document.getElementById('nav').classList.remove('active');
    }
})


function createCard() {
    for(let i=0;i<data.length;i++){
        const card = document.createElement('div');
        card.className = 'card';
    
        // Create the img element
        const img = document.createElement('img');
        img.src = `https://${data[i].movie.images.poster[0]}`;
        img.alt = '';
    
        // Create the span element
        const span = document.createElement('span');
        span.textContent = `${i+1}`;
    
        // Append img and span to the card div
        card.appendChild(img);
        card.appendChild(span);
    
        // Append the card to the container
        const container = document.getElementById('container');
        container.appendChild(card);
    }
    
}

function createPopularCard() {
    for(let i=0;i<data2.length;i++){
        const card = document.createElement('div');
        card.className = 'card';
    
        // Create the img element
        const img = document.createElement('img');
        img.src = `https://${data2[i].images.poster[0]}`;
        img.alt = '';
    
        // Create the span element
        const span = document.createElement('span');
        span.textContent = `${i+1}`;
    
        // Append img and span to the card div
        card.appendChild(img);
        card.appendChild(span);
    
        // Append the card to the container
        const container = document.getElementById('popular-container');
        container.appendChild(card);
    }
    
}


function createAnticipatedCard() {
    for(let i=0;i<data3.length;i++){
        const card = document.createElement('div');
        card.className = 'card';
    
        // Create the img element
        const img = document.createElement('img');
        img.src = `https://${data3[i].movie.images.poster[0]}`;
        img.alt = '';
    
        // Create the span element
        const span = document.createElement('span');
        span.textContent = `${i+1}`;
    
        // Append img and span to the card div
        card.appendChild(img);
        card.appendChild(span);
    
        // Append the card to the container
        const container = document.getElementById('anticipated');
        container.appendChild(card);
    }
    
}

const menu=document.getElementById('menu');
document.getElementById('open-menu').addEventListener('click',function(){
    menu.classList.add('active');
})

document.getElementById('close-menu').addEventListener('click',function(){
    menu.classList.remove('active');
})


const  search=document.getElementById('search-container');
document.getElementById('open-search').addEventListener('click',function(){
    search.classList.add('active');
})

document.getElementById('close-search').addEventListener('click',function(){
    search.classList.remove('active');
})