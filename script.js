function mainFunction(){
  var cityName = getCity();
  var weatherData = getWeatherData(cityName);
}

function getCity(){
    var enteredVal = document.querySelector("#searchEntry").value
    if(enteredVal != undefined){
        var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + enteredVal + "&limit=5&appid=" + apiKey
        fetch(geoURL).then(function (response) {
          return response.json();
      }).then(function(data, cityName){
        var coord = String(data[0].lat) + "," + String(data[0].lon) + "," + data[0].country + "," + data[0].state
        localStorage.setItem(data[0].name, coord)
      })
    }
    return enteredVal
}

function getWeatherData(city) {
  var cityData = localStorage.getItem(city).split(",")
  var lat = cityData[0]
  var lon = cityData[1]

  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var now = new Date
      var date = String(now.getMonth()+1) + "/" + String(now.getDate()) + "/" + String(now.getFullYear())
      var tempInF = (data.main.temp-273.15)*(9/5)+32
      var currentData = data.name + "," + date + "," + String(Math.round(tempInF)) + "," +  String(Math.round(data.wind.speed))  + "mph," + String(Math.round(data.main.humidity))+"%";
      localStorage.setItem("currentDay", currentData)
      console.log(localStorage.getItem("currentDay"))
    });

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
       
      });
}
var searchButton = document.getElementById("submit")
var apiKey = "d94e40dc3110b3f5435c24fcec8d0aca";
searchButton.addEventListener("click", mainFunction)
