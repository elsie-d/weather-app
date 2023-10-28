var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=sunnyvale&appid=d2049667069ea0037ba25d8371e6e8cc'
var city;
var apiKey = 'd2049667069ea0037ba25d8371e6e8cc'

fetch(queryURL)
.then(function (response){
    return response.json();
})
.then(function (data){
    console.log(data);
});