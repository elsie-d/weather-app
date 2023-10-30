var citySearch = document.querySelector("#city-search");
var searchBtn = document.querySelector("#search-btn");
var currentWeatherDiv = document.querySelector(".current-weather")
var forecastCardsDiv = document.querySelector(".forecast-cards")
var apiKEY = 'd2049667069ea0037ba25d8371e6e8cc'





// Updates webpage with weather for city that was queried

var createForecastCard = (cityValue, weatherBlock, index) => {
    if (index === 0){
        return `
         <div class="details">
          <h2>${cityValue}</h2>
          <h4>Temperature: ${(((weatherBlock.main.temp - 273.15)*1.8)+32).toFixed(0)} ℉</h4>
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
                <li class="list-group-item">Temp: ${(((weatherBlock.main.temp - 273.15)*1.8)+32).toFixed(0)} ℉</li>
                <li class="list-group-item">Humidity: ${weatherBlock.main.humidity}%</li>
                <li class="list-group-item">Wind: ${weatherBlock.wind.speed} M/S</li>
              </ul>
            </div>` }
}









// Use Coodintes to pull current weather and forecast info

var getWeahterInfo = (cityValue, lat, lon) => {
    var forecast_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKEY}`
    
    fetch(forecast_API_URL).then(res => res.json()).then(data => {
    console.log(data)      

        var uniqueDays = [];
        var fiveDayForecast = data.list.filter(forecast => {
            var forecastDay = new Date(forecast.dt_txt).getDate();
            if(!uniqueDays.includes(forecastDay)) {
                return uniqueDays.push(forecastDay)
            }
        })
            
            citySearch.value = "";
            currentWeatherDiv.innerHTML="";
            forecastCardsDiv.innerHTML="";


            console.log(fiveDayForecast);
            fiveDayForecast.forEach((weatherBlock, index) => {
                if (index === 0){
                    currentWeatherDiv.insertAdjacentHTML("beforeend",createForecastCard(cityValue, weatherBlock, index)) ;
                } else {
                    forecastCardsDiv.insertAdjacentHTML("beforeend",createForecastCard(cityValue, weatherBlock, index)) ;
                }
        })


    }).catch(() => {
        alert('An error occurred while fetching forecast!');
       });
}


//Convert City Coordinates

var getCoordinates = () => {
    var cityValue = citySearch.value.trim();
    console.log('clicked');
    console.log(cityValue);
   // if(!cityValue)return;
    var geoCode_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${apiKEY}`

    fetch(geoCode_API_URL).then(res => res.json()).then(data =>{
        if(!data.length) return alert (`Having trouble locating location of:  ${cityValue}`)
        var {name, lat, lon} = data[0]
        getWeahterInfo(name, lat, lon);
        console.log(data)
    }).catch(() =>{
        alert("An errror occured while fetching data")
    })


}



searchBtn.addEventListener("click", function(e){
    e.preventDefault()
    getCoordinates()
});