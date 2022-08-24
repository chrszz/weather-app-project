let now = new Date();

function showDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = day + " " + hours + ":" + minutes;
  return today;
}
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = showDay();

//
function showDate() {
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
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let today = month + ", " + date;
  return today;
}
let currentDate = document.querySelector("#current-month");
currentDate.innerHTML = showDate();

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  showTemp(cityInput.value);
}

let newCity = document.querySelector(".search-form");
newCity.addEventListener("submit", city);

// C/F temp

function convertF(event) {
  event.preventDefault();
  let fTemp = (cTemp * 9) / 5 + 32;
  let convTemp = document.querySelector(".conv-temp");
  convTemp.innerHTML = Math.round(fTemp);
}
function convertC(event) {
  event.preventDefault();
  let convTemp = document.querySelector(".conv-temp");
  convTemp.innerHTML = Math.round(cTemp);
}
let fLink = document.querySelector("#ftemp");
fLink.addEventListener("click", convertF);

let cLink = document.querySelector("#ctemp");
cLink.addEventListener("click", convertC);

let cTemp = null;

//

function showTemp(response) {
  // console.log(response.data);
  let h2 = document.querySelector(".conv-temp");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = temperature;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  document.querySelector(".about-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let icon = document.querySelector(".main-icon");
  icon.setAttribute("src", `./img/${response.data.weather[0].icon}.png`);

  cTemp = response.data.main.temp;
}

//

function searchCity() {
  let sCity = document.querySelector("#city-input");
  let apiKey = "32e54888351435f0f34bb679ab4aac3a";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    sCity.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  let h1 = document.querySelector("h1");
  h1.innerHTML = sCity.value;
  axios.get(apiUrl).then(showTemp);
}

newCity.addEventListener("submit", searchCity);

//current position

function showPosition(position) {
  let apiKey = "32e54888351435f0f34bb679ab4aac3a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentBtn = document.querySelector(".current-btn");
currentBtn.addEventListener("click", getCurrentLocation);
