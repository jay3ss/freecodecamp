function getWeather() {

    if (navigator.geolocation) {
        getLocation();
    } else {
        $("#temperature").html(
            "Your device does not support 'geolocation'"
        );
    }
}


function getLocation() {
    var location = {
        longitude: "",
        latitude: ""
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            location.latitude  = position.coords.latitude;
            location.longitude = position.coords.longitude;

            buildUrl(location);
        });
    }
}

function buildUrl(location) {
    var API_KEY = "a717ecf37b291b5479bcd9665446b470";

    var lat = location.latitude;
    var lng = location.longitude;
    var url = "http://api.openweathermap.org/data/2.5/weather?";
    url += "lat=" + lat + "&lon=" + lng + "&appid=" + API_KEY;
    console.log(url);

    var icon = "";

    $.getJSON(url, function(json) {
        console.log(json.weather[0].icon);
        // console.log(json.main.temp);
        // console.log(json.weather.main);
        $("#temperature").html(
            parseFloat(json.main.temp - 273.15).toPrecision(3)
        );

        var weather = json.weather[0].main;

        displayWeather(weather);
    });
}

function displayWeather(weather) {
    var weather_display = "";

    if (!$("div").hasClass("icon")) {
        if (weather === "Snow") {
            weather_display =  "<div class=\"icon flurries\">";
            weather_display += "<div class=\"cloud\"></div>";
            weather_display += "<div class=\"snow\">";
            weather_display += "<div class=\"flake\"></div>";
            weather_display += "<div class=\"flake\"></div>";
            weather_display += "</div></div>";
        } else if (weather === "Mist") {
            weather_display =  "<div class=\"icon sunny\">";
            weather_display += "<div class=\"sun\">";
            weather_display += "<div class=\"rays\">";
            weather_display += "</div></div>";
        } else if (weather === "Rain" || weather === "Mist") {
            weather_display =  "<div class=\"icon rainy\">";
            weather_display += "<div class=\"cloud\"><div class=\"rain\">";
            weather_display += "</div></div>";
        } else if (weather === "Storm" || weather === "Extreme") {
            weather_display =  "<div class=\"icon thunder-storm\">";
            weather_display += "<div class=\"cloud\"></div>";
            weather_display += "<div class=\"lightning\">";
            weather_display += "<div class=\"bolt\"></div>";
            weather_display += "<div class=\"bolt\"></div>";
            weather_display += "</div></div>";
        } else {
            weather_display =  "<div class=\"icon sunny\">";
            weather_display += "<div class=\"sun\"><div class=\"rays\">";
            weather_display += "</div></div>";
        }
    }


    $(".weather-display").append(weather_display);
}

$(document).ready(function() {
    $("#get-weather").on("click", function() {
        getWeather();
    });
    $("#temp-toggle").on("click", function() {
        convertTemp();
    })
});
