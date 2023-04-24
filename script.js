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

function showWeather(response) {
  console.log(response.data.weather[0].description);
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
}
function search(event) {
  event.preventDefault();
  let apiKey = "5cf64457cc411e957305c47930adde00";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);

  /*let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("heading-1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }*/
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data);
  description.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = `${temperature}`;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temp-description");
}

//axios
//axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
//Bonus feature
function farenheitConversion(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", farenheitConversion);

function celcuisConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  //let celsiusTemperature = Math.round(((celsiusTemperature - 32) * 5) / 9);
  // temperature = Number(temperature);
  //(32°F − 32) × 5/
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celcuisConversion);

let celsiusTemperature = null;

//locationSearch
