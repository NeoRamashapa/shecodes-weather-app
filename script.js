//Feature 1 display day & time
let h3 = document.querySelector("h3");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()]; //0 and 6
h3.innerHTML = `${day} , ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>
      
      <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="weather-icon"
        width="42"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}°C </span>
        <span class="weather-forecast-temperature-min"> | ${Math.round(
          forecastDay.temp.min
        )}°C </span>
      </div>
  </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lon}&lon=${coordinates.lat}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  document.querySelector("#heading-1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
  //console.log(response.data);
  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("heading-1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temp-description");

  description.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function fahrenheitConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);

function celsuisConversion(event) {
  event.preventDefault();

  let Ctemp = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(Ctemp);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsuisConversion);

let celsiusTemperature = null;

//locationSearch
