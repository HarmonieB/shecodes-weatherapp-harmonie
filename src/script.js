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
function citySearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let unit = "metric";
  let apiKey = "72c0aac2a19c10048efe9402ebd9cca2";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(temperature*9/5 + 32);
}

function convertBackToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = "19";
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
let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", citySearch);

//Current temperature setup
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertBackToCelsius);

//Geolocation button set up
let geolocationButton = document.querySelector("#location-button");
geolocationButton.addEventListener("click", getCurrentPosition);
