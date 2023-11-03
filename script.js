var searchButton = document.getElementById("submit")
var apiKey = "d94e40dc3110b3f5435c24fcec8d0aca";
var weatherData = ""
searchButton.addEventListener("click", mainFunction)

function mainFunction(){
  getCity();
}

function getCity(){
    var enteredVal = document.querySelector("#searchEntry").value
    if(enteredVal != undefined){
        var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + enteredVal + "&limit=5&appid=" + apiKey
        fetch(geoURL).then(function (response) {
          return response.json();
      }).then(function(data){
        var coord = String(data[0].lat) + "," + String(data[0].lon) + "," + data[0].country + "," + data[0].state +","
        localStorage.setItem(data[0].name, coord)
        getWeatherData(data[0].name);
      })
    }
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
      var now = new Date
      var date = String(now.getMonth()+1) + "/" + String(now.getDate()) + "/" + String(now.getFullYear())
      var tempInF = (data.main.temp-273.15)*(9/5)+32
      var currentData = data.name + "," + date + "," + String(Math.round(tempInF)) + "," +  String(Math.round(data.wind.speed))  + "mph," + String(Math.round(data.main.humidity))+"%,";
      localStorage.setItem("currentDay", currentData)
    });

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var forecast = "";
        for(var i = 0; i< 40; i = i+8){
          var tempInF = (data.list[i].main.temp-273.15)*(9/5)+32
          forecast = forecast + data.list[i].dt_txt.substring(0, 10) + "," + data.list[i].weather[0].icon + "," + String(Math.round(tempInF)) + "," + String(Math.round(data.list[i].wind.speed)) + "mph," + String(Math.round(data.list[i].main.humidity))+"%,";
        }
        var forecastUpdate = localStorage.getItem(city) + forecast
        localStorage.setItem(city, forecastUpdate)
      });
  updateDisplay();
}

function updateDisplay(){
  var dataArray = localStorage.getItem(cityName).split(",")
  console.log(dataArray)
}
