const title = document.getElementById("title");
const submitBtn = document.getElementById("submit-btn");

async function fetchMovies(searchTerm) {
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/search/movie?query=${searchTerm}&extended=full,images`;
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
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}
async function fetchSeries(searchTerm) {
    const clientId = "cdcf192406f8361d8a02e82e99c86ffde257a7f55f52f5833804e48f3d252da8";
    const url = `https://api.trakt.tv/search/show?query=${searchTerm}&extended=full,images`;
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
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}



const paths = document.querySelectorAll('.star');
        
        console.log('Number of path elements:', paths.length);

        for(let i=0;i<paths.length;i++){
            paths[i].addEventListener('click',function(){
                for(let j=0;j<paths.length;j++){
                    paths[j].style.fill="#fff";
                    paths[j].style.stroke="black";
                }
                for(let k=0;k<=i;k++){
                    paths[k].style.fill="orange";
                    paths[k].style.stroke="orange";
                    
                }
            })
        }

function getSearchTerm() {
    let search = title.value.trim();
    if (search == "") {
        console.log("Error");
    }
    else {
        fetchMovies(search);
        fetchSeries(search);
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