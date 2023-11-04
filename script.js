var searchButton = document.getElementById("submit")
var apiKey = "d94e40dc3110b3f5435c24fcec8d0aca";
var ul = document.querySelector("#previousResults")
searchButton.addEventListener("click", mainFunction)
ul.addEventListener("click", function(event){
  getCity(event.target.innerHTML)
})

function mainFunction(){
  var enteredVal = document.querySelector("#searchEntry").value
  getCity(enteredVal);
}

function getCity(cityName){
    if(cityName != undefined){
        var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey
        fetch(geoURL).then(function (response) {
          return response.json();
      }).then(function(data){
        var coord = String(data[0].lat) + "," + String(data[0].lon);
        getWeatherData(data[0].name, coord);
      })
    }
}

function getWeatherData(city, coord) {
  var cityName = city
  var coord = coord.split(",")
  var lat = coord[0]
  var lon = coord[1]
  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var now = new Date
      var date = String(now.getMonth()+1) + "/" + String(now.getDate()) + "/" + String(now.getFullYear())
      
      var cityTitle = document.querySelector("#cityHeader")
      cityTitle.innerHTML = cityName + "(" + date + ")";

      var weatherIconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      var currentIcon = document.querySelector("#currentIcon")
      currentIcon.src = weatherIconURL;
      
      
      var tempEle = document.querySelector("#currentTemp")
      var tempInF = Math.round(((data.main.temp-273.15)*(9/5)+32)*100)/100
      tempEle.innerHTML = "Temp: " + tempInF + "°F"
      
      var windEle = document.querySelector("#currentWind")
      var wind = "Wind: " + String(Math.round(data.wind.speed))+ "mph"
      windEle.innerHTML = wind
      
      var humidEle = document.querySelector("#currentHumid")
      var humid = "Humidity: " + String(Math.round(data.main.humidity))+"%";
      humidEle.innerHTML = humid
      
    });

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var now = new Date;
        var count = 1;
        for(var i = 0; i< 40; i = i+8){
          setForecast(now, count, i, data);
          count++;
        }
      });
  saveResults(city);
}

function setForecast(now, count, i, data){
  var date = String(now.getMonth()+1) + "/" + String(now.getDate()+count) + "/" + String(now.getFullYear())  
  var dateHeader = document.querySelector("#date"+String(count))
  
  var weatherIconURL = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
  var icon = document.querySelector("#icon"+String(count))
  icon.src = weatherIconURL;

  var tempEle = document.querySelector("#temp"+String(count))
  var tempInF = Math.round(((data.list[i].main.temp-273.15)*(9/5)+32)*100)/100
  tempEle.innerHTML = "Temp: " + tempInF + "°F"
      
  var windEle = document.querySelector("#wind"+String(count))
  var wind = "Wind: " + String(Math.round(data.list[i].wind.speed))+ "mph"
  windEle.innerHTML = wind
      
  var humidEle = document.querySelector("#humid"+String(count))
  var humid = "Humidity: " + String(Math.round(data.list[i].main.humidity))+"%";
  humidEle.innerHTML = humid  
}

function saveResults(cityName){
  var previousEntries = document.querySelector("#previousResults").children
  var newEntryNeeded = true;
  for(var i=0; i< previousEntries.length; i++){
    if(previousEntries[i].innerHTML == cityName){
      newEntryNeeded = false;
      break
    }
  }
  if (newEntryNeeded){
    var newPrevious = document.createElement("li");
    newPrevious.textContent = cityName;
    newPrevious.style.listStyleType = "none";
    document.querySelector("#previousResults").appendChild(newPrevious);
  }
}