function getFormattedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  return `${currentDay} ${currentDate} ${currentMonth}`;
}

// Display City & Weather Data
function showCelsius() {
  let cityInput = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "72c0aac2a19c10048efe9402ebd9cca2";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}
function showFahrenheit() {
  let cityInput = document.querySelector("#city-input");
  let unit = "imperial";
  let apiKey = "72c0aac2a19c10048efe9402ebd9cca2";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;

  let h1Temp = document.querySelector("#current-temperature");
  h1Temp.innerHTML = temperature;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = description;

  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", showCelsius);

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", showFahrenheit);
}

function showCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("h2#city");
  city.innerHTML = `${cityInput.value}`.toLowerCase();

  let unit = "metric";
  let apiKey = "72c0aac2a19c10048efe9402ebd9cca2";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

//Geolocation Search
function showGeolocatedCity(response) {
  let geolocatedCity = response.data.locality;
  let city = document.querySelector("h2#city");
  city.innerHTML = `${geolocatedCity}`.toLowerCase();

  let unit = "metric";
  let apiKey = "72c0aac2a19c10048efe9402ebd9cca2";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${geolocatedCity}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function getCity(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "99e099dbf6f34002880cc9b8106d9d20";
  let apiUrl = `http://api.positionstack.com/v1/reverse?access_key=${apiKey}&query=${latitude},${longitude}`;
  axios.get(apiUrl).then(showGeolocatedCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCity);
}

//Current time setup
let currentTime = document.querySelector("#current-date");
let now = new Date();
currentTime.innerHTML = getFormattedDate(now);


//City setup
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCityWeather);

//Geolocation button set up
let geolocationButton = document.querySelector("#location-button");
geolocationButton.addEventListener("click", getCurrentPosition);
