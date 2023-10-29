
var searchForm = document.querySelector('form')

function handleSearch(event){
event.preventDefault();
var searchInput = document.querySelector('#search').value   

    if (!searchInput) {
        alert('Cannot search for blank input');
}

var queryString = './search-return.html?q=' + searchInput;
location.assign(queryString);

//fetch(queryURL);

console.log(queryString);
}

searchForm.addEventListener('submit', handleSearch)
 

console.log("test") 