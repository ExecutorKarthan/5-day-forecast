function mainFunction(){
    var city = getCity();
    var weatherData = getWeatherData(city);
}

function getCity(){
    var enteredVal = document.querySelector("#searchEntry").value
    console.log(enteredVal)
    if(enteredVal != undefined){
        var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + enteredVal + "&limit=5&appid=" + apiKey
        var end = "End"
    }
}

function getWeatherData(city) {
  var weatherUrl = 'https://api.github.com/orgs/nodejs/repos';
  

  api = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}

var searchButton = document.getElementById("submit")
var apiKey = "d94e40dc3110b3f5435c24fcec8d0aca";
searchButton.addEventListener("click", mainFunction)
