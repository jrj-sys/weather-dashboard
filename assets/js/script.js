// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var getCityWeather = function(city) {
    // call Weather API for (city) specific weather
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6f634b702b3d948c5f118672eb3c519f&units=imperial';
    fetch(apiUrl).then(function(response){
        // request was successful 
        if (response.ok) {
                console.log(response);
            response.json().then(function(data) {
                var cityName = data.name
                var locationId = data.id
                localStorage.setItem(cityName, locationId)
        
                $('.cityinfo .cityname').text(data.name);
                $('.cityinfo .temp').text('Temp: ' + data.main.temp);
                $('.cityinfo .wind').text('Wind: ' + data.wind.speed + ' MPH');
                $('.cityinfo .humidity').text('Humidity: ' + data.main.humidity + '%');
                // $('.cityinfo .uvindex').text('UV Index: ' + );
                console.log(data);
            })
        // request unsucessful 
        } else {
            alert("Error: " + response.statusText);
        };
    });
};


$( '.submit' ).on("click", function() {
    var location = $( '.searchbox' ).val();
    if (location) {
        getCityWeather(location)
        } else {
        alert("Please enter a city name!");
    };
});


// var displayWeather = function (data) {
//     ('.cityinfo .temp').text('Temp: ' + data.main.temp);
//     ( '.cityinfo .wind' );
//     ( '.cityinfo .humidity' );
//     ( '.cityinfo .uvindex ');
// }








// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
