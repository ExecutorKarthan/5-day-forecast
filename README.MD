# Live Project
<a href="https://executorkarthan.github.io/5-day-forecast/">Link to the live page</a>
Here is a GIF showing the programs functionality
![5 Day Forecast Demo GIF](5-day-Forecast%20Demo.gif)
<a href="5-day-Forecast Demo.mp4">Link to the live video</a>

# Description
I used this project as an opportunity to experiment and understand how Bootstrap works, since it is a technology that I may use in a professional setting. I found it was helpful for developing a broad idea of the layout, but it was not sufficient for all my styling needs. I needed to make a style sheet to correct issues I saw and I needed to develop HTML to create unique containers to write data to. This project also allowed me to understand fetch requests and the use of an external API. I did not really think about how fetch requests were not instantly executed, given that the request needs to travel to the endpoint server and then a response would need to be sent. I ran into trouble making separate functions that required input for each other as a result of the time delay. This led me to nest the functions so they would wait until they had the needed data (meaning the previously required fetch request was complete). This project showed me that local storage in a web browser was also a local variable instead of something that was a global variable. I attempted to store data between functions in local storage, only to discover that stored data at a deeper function level would not appear at a higher level - meaning that local storage requires some style of return for it to be updated. 

# Installation and Running
N/A

# How to Use this Project
The user needs to enter a city into the search box, then click the search button. The application will then respond by displaying the current weather conditions for the entered city, along with a 5 day forecast for the city. The application will then save which city was requested and add an element under the search bar of the city's name. If the user clicks on the previously selected city element, the application will then fetch and display that city's weather data again. This saves the user from having to retype the city's name into the search box and then clicking the search button.  

# Credits
The HTML code for the page layout was taken from Bootstrap, with adjustments made by me to style it and to create data containers/cards for user display. I used the OpenWeather API to as a data source for the longitude and latitude coordinates, the current weather conditions, as well as the forecast information. I authored the Javascript to fetch the data out of the API, organize it, then assign it to locations on the HTML page. I also created the CSS to overwrite elements/style choices that Bootstrap had made that I did not like. 

# License
This project has an MIT license