let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

let city = prompt("Enter a city?");

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;
  let celsiusTemperature = Math.round(temperature);
  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
  alert(
    `It is currently ${celsiusTemperature} (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

function displayCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}

function formatDay(date) {


}

function searchCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  cityInput = cityInput.value.trim();
  h1.innerHTML = `${cityInput}`;
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", search);



function formatDay(timestamp) {
  let date = new date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", ]

  return day;

}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily; 
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon", "Tues"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="days-temperature">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey="ac209dae1f283fb332a5bb7f50b0f468";
    let apiUrl='https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric';
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
       src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
        }@2x.png" 
      alt="" width="42"
      />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}°/</span>
       </div>
      </div>
   `
  }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function search(event) {
  event.preventDefault();
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let city = document.querySelector("#search-bar").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let units = "metric";


function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
 dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute (
    "src",
    `http://openweathermap.org/img/wn/${response.data.condition.icon_url}@2x.png`);
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coord);
}

function diplayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current");
  currentTemp.innerHTML = `${temperature}`;
}


function getCurrentPosition(position) {
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(cityInputElement.value);
}

function locationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", locationTemperature);