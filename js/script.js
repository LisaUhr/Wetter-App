const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

let searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        if (searchInputBox.value === "") {
            alert('please enter input value');
        } else {
            console.log(searchInputBox.value);
            getWeatherReport(searchInputBox.value);
        }
    }
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(response => response.json())
    .then(showWeatherReport)
    .catch(error => {
        console.error('Error fetching the weather data:', error);
    });
}

function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    let date = document.getElementById('date');
    let temp = document.getElementById('temp');
    let min_max = document.getElementById('min-max');
    let my_weather = document.getElementById('weather');

    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    temp.innerHTML = `${weather.main.temp}&deg;C`;
    my_weather.innerHTML = `${weather.weather[0].main}`;
    min_max.innerHTML = `${weather.main.temp_min}&deg;C (min) / ${weather.main.temp_max}&deg;C (max)`;

    let todayDate = new Date();
    date.innerHTML = dateManager(todayDate, weather.main.pressure);

    if (my_weather.textContent == 'Clear') {
        document.body.style.backgroundImage = "url(./'bilder/clear.jpg)";
    } else if (my_weather.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('./bilder/clouds.jpg')";
    } else if (my_weather.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('./bilder/haze.jpg')";
    } else if (my_weather.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('./bilder/rain.jpg')";
    } else if (my_weather.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('./bilder/snow.jpg')";
    } else if (my_weather.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('./bilder/thunderstorm.jpg')";
    } else {
        document.body.style.backgroundImage = "url('./haze1.jpg')";
    }
}

function dateManager(todayDate, pressure) {
    let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let year = todayDate.getFullYear();
    let month = months[todayDate.getMonth()];
    let date = todayDate.getDate();
    let day = days[todayDate.getDay()];
    let statusUpdate = "<br>Uhrzeit: " + new Date(Date.now()).toLocaleTimeString();
    let pressureUpdate = "<br>Aktueller Luftdruck: " + pressure + " hPa";

    return `${date} ${month} (${day}), ${year} ${statusUpdate} ${pressureUpdate}`;
}




