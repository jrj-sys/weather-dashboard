// listening for click on submit button, and passing input into getCityLatLon
$( '.submit' ).on("click", function() {
    var location = $('.searchbox').val();
    if (location) {
        getCityLatLon(location)
        } else {
        alert("Please enter a city name!");
    };
});

// call getCityLatLon to request weather for user saved search
$('.recentsearch').on('click', 'button', function(event) {
    var clickedInput = event.target.innerHTML
    getCityLatLon(clickedInput);
});

// use old OneCall API to get latitude/longitude of user inputted city
var getCityLatLon = function(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6f634b702b3d948c5f118672eb3c519f&units=imperial';
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                console.log(data);
                // take data.name (capitalized city name) and ID and set to localStorage 
                var location = data.name
                // var locationId = data.id
                localStorage.setItem(location, location)

                
                $('.cityinfo .cityname').text(data.name);
                $('#wicon').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
                $('.cityinfo .temp').text('Temp: ' + data.main.temp + ' °F');
                $('.cityinfo .wind').text('Wind: ' + data.wind.speed + ' MPH');
                $('.cityinfo .humidity').text('Humidity: ' + data.main.humidity + '%');
                getCityWeather(lat, lon);
            })
        }
    })
}

// use getCityLatLon latitude and longitude values to input into OneCall API 
var getCityWeather = function(lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon +'&appid=6f634b702b3d948c5f118672eb3c519f&units=imperial';
    fetch(apiUrl).then(function(response){
        // request was successful 
        if (response.ok) {
            response.json().then(function(data) {
                $('.cityinfo #uv-index').text(data.daily[0].uvi);
                console.log(data);
                // add background colors to UV index text 
                if (data.daily[0].uvi >= 0 && data.daily[0].uvi < 3) {
                    $('.cityinfo #uv-index').addClass("low");
                } else if (data.daily[0].uvi >= 3 && data.daily[0].uvi < 6) {
                    $('.cityinfo #uv-index').addClass("moderate");
                } else if (data.daily[0].uvi >= 6 && data.daily[0].uvi < 8) {
                    $('.cityinfo #uv-index').addClass("high");
                } else if (data.daily[0].uvi >= 8 && data.daily[0].uvi < 10) {
                    $('.cityinfo #uv-index').addClass("veryhigh");
                } else {
                    $('.cityinfo #uv-index').addClass("extreme");
                }
                
                // dynamically update 5-day forecast container
                for (var i = 0; i < data.daily.length; i++) {
                    $('.wicon').eq(i).attr('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png');
                    $('.forecast .temp').eq(i).text('Temp: ' + data.daily[i].temp.day);
                    $('.forecast .wind').eq(i).text('Wind: ' + data.daily[i].wind_speed + ' MPH');
                    $('.forecast .humidity').eq(i).text('Humidity: ' + data.daily[0].humidity + '%');
                }  
            })
            // request unsucessful 
        } else {
            alert("Error: " + response.statusText);
        };
    });
};

// retrieve localStorage on page refresh
function getSavedSearches() {
    for (var i = 0; i < localStorage.length; i++) {
        var recentBtn = document.createElement('button');
        var recentCont = document.querySelector('.recentsearch');
        recentBtn.innerHTML = localStorage.key(i);
        recentCont.appendChild(recentBtn);
        recentBtn.classList.add('savedbtn');
    }
}
getSavedSearches();


