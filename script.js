//Create variables to store consistently used data
var searchButton = document.getElementById("submit")
var apiKey = "d94e40dc3110b3f5435c24fcec8d0aca";
var ul = document.querySelector("#previousResults")

//Add an event listener to search for weather when the search button is clicked
searchButton.addEventListener("click", mainFunction)

//Create an event listener for when a previously selected city is clicked on
ul.addEventListener("click", function(event){
  getCity(event.target.innerHTML)
})

//Call a primary function that will start the function cascade
function mainFunction(){
  var enteredVal = document.querySelector("#searchEntry").value
  getCity(enteredVal);
}

//Create a function to fetch the geographic coordinates for the entered city
function getCity(cityName){
    if(cityName != undefined){
      //Generate a URL using my API key and add in the correct location
      var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey
      //Fetch the location data, then pass it to the get weather function
      fetch(geoURL).then(function (response) {
          return response.json();
      }).then(function(data){
        var coord = String(data[0].lat) + "," + String(data[0].lon);
        getWeatherData(data[0].name, coord);
      })
    }
}

//Create a function to retrieve weather data
function getWeatherData(city, coord) {
  var cityName = city
  var coord = coord.split(",")
  var lat = coord[0]
  var lon = coord[1]
  //Generate a URL using my API key and add in the correct latitude and longitude for the current weather conditions
  var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    //Take the data returned and process it into components. Then update the HTML with those components
    .then(function (data) {
      //Get date
      var now = new Date
      var date = String(now.getMonth()+1) + "/" + String(now.getDate()) + "/" + String(now.getFullYear())
      
      //Get city name
      var cityTitle = document.querySelector("#cityHeader")
      cityTitle.innerHTML = cityName + "(" + date + ")";

      //Get weather icon
      var weatherIconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      var currentIcon = document.querySelector("#currentIcon")
      currentIcon.src = weatherIconURL;
      
      //Get temperature
      var tempEle = document.querySelector("#currentTemp")
      var tempInF = Math.round(((data.main.temp-273.15)*(9/5)+32)*100)/100
      tempEle.innerHTML = "Temp: " + tempInF + "°F"
      
      //Get wind data
      var windEle = document.querySelector("#currentWind")
      var wind = "Wind: " + String(Math.round(data.wind.speed))+ "mph"
      windEle.innerHTML = wind
      
      //Get humidity data
      var humidEle = document.querySelector("#currentHumid")
      var humid = "Humidity: " + String(Math.round(data.main.humidity))+"%";
      humidEle.innerHTML = humid
    });

    //Generate a URL using my API key and add in the correct latitude and longitude for the forecast data
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Get a new time and keep track of how many days of the forecast you collect. We need 5.
        var now = new Date;
        var count = 1;
        for(var i = 0; i< 40; i = i+8){
          //Collect the forecast data and then update the box in which it belongs
          setForecast(now, count, i, data);
          count++;
        }
      });
  //Save the city searched
  saveResults(city);
}

//Create a function that collects forecast date and updates a forecast box
function setForecast(now, count, i, data){
  //Collect and update the date
  var date = String(now.getMonth()+1) + "/" + String(now.getDate()+count) + "/" + String(now.getFullYear())  
  var dateHeader = document.querySelector("#date"+String(count))
  dateHeader.textContent = date;
  
  //Collect and update the icon
  var weatherIconURL = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
  var icon = document.querySelector("#icon"+String(count))
  icon.src = weatherIconURL;

  //Collect and update the temperature
  var tempEle = document.querySelector("#temp"+String(count))
  var tempInF = Math.round(((data.list[i].main.temp-273.15)*(9/5)+32)*100)/100
  tempEle.innerHTML = "Temp: " + tempInF + "°F"
  
  //Collect and update the wind data 
  var windEle = document.querySelector("#wind"+String(count))
  var wind = "Wind: " + String(Math.round(data.list[i].wind.speed))+ "mph"
  windEle.innerHTML = wind
  
  //Collect and update the humidity data
  var humidEle = document.querySelector("#humid"+String(count))
  var humid = "Humidity: " + String(Math.round(data.list[i].main.humidity))+"%";
  humidEle.innerHTML = humid  
}

//Create a function to add a list item with the name of the previously search citys
function saveResults(cityName){
  //Pull a list of previous entries and set a variable to say we need to add an entry
  var previousEntries = document.querySelector("#previousResults").children
  var newEntryNeeded = true;
  //Check to see if the city that is in que to be added is already on the list. If so, set the variable to false, break the loop and terminate the function
  for(var i=0; i< previousEntries.length; i++){
    if(previousEntries[i].innerHTML == cityName){
      newEntryNeeded = false;
      break
    }
  }
  //If the city is not on the list, add it with these styling elements
  if (newEntryNeeded){
    var newPrevious = document.createElement("li");
    newPrevious.textContent = cityName;
    newPrevious.style.listStyleType = "none";
    newPrevious.style.background = "gray";
    newPrevious.style.color = "white";
    newPrevious.classList.add("text-center")
    newPrevious.classList.add("rounded")
    newPrevious.classList.add("m-2")
    document.querySelector("#previousResults").appendChild(newPrevious);
  }
}