var searchParams = new URLSearchParams(window.location.search);
//console.log(searchParams.has('q'));
//console.log(searchParams.get('q'));
var cityParam = searchParams.get('q').trim();
console.log(cityParam)

//var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityParam + '&appid=d2049667069ea0037ba25d8371e6e8cc'
//console.log(queryURL)
//var apiKey = 'd2049667069ea0037ba25d8371e6e8cc'  <-- 401 error when variable is used in url string builder
var currentWeatherDiv = document.querySelector(".current-weather")
var forecastCardsDiv = document.querySelector(".forecast-cards")

// Updates webpage with weather for city that was queried

var createForecastCard = (cityParam, weatherBlock, index) => {
    if (index === 0){
        return `
        
        <div class="details">
          <h2>${cityParam}</h2>
          <h4>Temperature: ${(((weatherBlock.main.temp - 273.15)*1.8)+32).toFixed(2)} ℉</h4>
          <h4>Humidity:  ${weatherBlock.main.humidity}%</h4>
          <h4>Wind: ${weatherBlock.wind.speed} M/S</h4>
      </div>
      <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherBlock.weather[0].icon}@2x.png" alt="weather-icon">
        <h6>${weatherBlock.weather[0].description}</h5>
      </div>  `
    } else {
    return `<div class="card col-lg-2 col-md-2 col-sm-12 col-12" >
              <div class="card-body">
                <img src="https://openweathermap.org/img/wn/${weatherBlock.weather[0].icon}@2x.png" class="card-img-top text-center" alt="weather icon" >
                <p class="card-text">${weatherBlock.dt_txt.split(" ")[0]}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Temp: ${(((weatherBlock.main.temp - 273.15)*1.8)+32).toFixed(2)} ℉</li>
                <li class="list-group-item">Humidity: ${weatherBlock.main.humidity}%</li>
                <li class="list-group-item">Wind: ${weatherBlock.wind.speed} M/S</li>
              </ul>
            </div>` }
}

console.log(createForecastCard)


// Use Coodintes to pull current weather and forecast info

var getWeahterInfo = (cityParam, lat, lon) => {
    var forecast_API_URL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' +lat + '&lon=' + lon + '&appid=d2049667069ea0037ba25d8371e6e8cc'
    
    fetch(forecast_API_URL).then(res => res.json()).then(data => {
        

        var uniqueDays = [];
        var fiveDayForecast = data.list.filter(forecast => {
            var forecastDay = new Date(forecast.dt_txt).getDate();
            if(!uniqueDays.includes(forecastDay)) {
                return uniqueDays.push(forecastDay)
            }
        })
            
            cityParam = "";
            currentWeatherDiv.innerHTML="";
            forecastCardsDiv.innerHTML="";


            console.log(fiveDayForecast);
            fiveDayForecast.forEach((weatherBlock, index) => {
                if (index === 0){
                    currentWeatherDiv.insertAdjacentHTML("beforeend",createForecastCard(cityParam, weatherBlock, index)) ;
                } else {
                    forecastCardsDiv.insertAdjacentHTML("beforeend",createForecastCard(cityParam, weatherBlock, index)) ;
                }
        })


    }).catch(() => {
        alert('An error occurred while fetching forecast!');
       });
}

//Convert City Pram Coordinates

var getCityCoordinates = () => {
   var geoCode_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ cityParam + '&limit=5&appid=d2049667069ea0037ba25d8371e6e8cc'

   fetch(geoCode_API_URL).then(res => res.json()).then(data => {
    if(!data.length) return alert ('No coordinars found for' + cityParam)
    console.log(data)
    var {name, lat, lon} = data[0];
    getWeahterInfo(name, lat, lon);
   }).catch(() => {
    alert('An error occurred while fetching coordinates!');
   });


}




$(document).ready(getCityCoordinates)




