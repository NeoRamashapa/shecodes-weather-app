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

function displayForecast(response) {
  console.log(response.data.daily);
}

displayForecast();

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5cf64457cc411e957305c47930adde00";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}
  &appid=${apiKey}
  &units=metric`;
  console.log(apiUrl);
  //axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let apiKey = "5cf64457cc411e957305c47930adde00";
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

//axios
//axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
//Bonus feature
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
