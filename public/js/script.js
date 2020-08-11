var movieArray = [];
var favArray = [];
function getMovies() {
    let addFavouriteButton = document.createElement('input');
    addFavouriteButton.setAttribute('value', 'Add to Favourites');
    addFavouriteButton.setAttribute('type', 'button');
    var movieString = '';
    return fetch(`http://localhost:3000/movies`)
        .then(response => {
            if (response.ok)
                return response.json();
            else return Promise.reject(new Error("Error"));
        }).then(result => {
            let movieList = document.querySelector('#moviesList');
            result.forEach(element => {
                movieString += `<li>${element.id} | ${element.title} | ${element.posterPath}</li>`;
                movieString += `<button onclick = 'addFavourite(${element.id})'>Add to Favourites</button>`;
            });
            movieList.innerHTML = movieString;
            movieArray = result;
            return result;
        }).catch(err => {
            return err;
        })
}

function getFavourites() {
    var favouriteString = '';
    return fetch(`http://localhost:3000/favourites`)
        .then(response => {
            if (response.ok)
                return response.json();
            else return Promise.reject(new Error("Error"));

        }).then(result => {
            console.log(result);
            let favourtiteList = document.querySelector('#favouritesList');
            result.forEach(element => {
                favouriteString += `<li>${element.id} | ${element.title} | ${element.posterPath}</li>`
            });
            favourtiteList.innerHTML = favouriteString;
            favArray = result;
            return result;
        }).catch(err => {
            console.log(err);
            return err;
        })
}

function addFavourite(movieId) {
    var favAdd = '';
    var checkDuplicate = favArray.find(item => item.id===movieId);
    var movie = movieArray.find(item => item.id===movieId);
    if(checkDuplicate){
        return Promise.reject(new Error("Movie is already added to favourites"));
    }
    return fetch('http://localhost:3000/favourites', {
        "method": "POST",
        "body": JSON.stringify(movie),
        "headers": { "Content-Type": "application/json" }
    })
        .then(response => {
            if(response.status == 200)return response.json();
        })
        .then(result=>{
            favArray.push(result);
            favArray.forEach(element => {
                favAdd += `<li>${element.id} | ${element.title} | ${element.posterPath}</li>`;
            });
            document.querySelector('#favouritesList').innerHTML = favAdd;
            return favArray;
        });
}

module.exports = {
    getMovies,
    getFavourites,
    addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


