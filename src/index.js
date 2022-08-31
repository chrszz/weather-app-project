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

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "32e54888351435f0f34bb679ab4aac3a";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemp);
}

let newCity = document.querySelector(".search-form");
newCity.addEventListener("submit", city);

//

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "32e54888351435f0f34bb679ab4aac3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

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

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = showDay();
  let currentDate = document.querySelector("#current-month");
  currentDate.innerHTML = showDate();

  getForecast(response.data.coord);
}

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

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `   <div class="col-3">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">${formatDay(forecastDay.dt)}</h6>
                <img src="./img/${
                  forecastDay.weather[0].icon
                }.png" class="weathericon" />
                <p class="card-text">
                  <span class="hot">${Math.round(
                    forecastDay.temp.max
                  )}°</span> <span class="cold">↓${Math.round(
          forecastDay.temp.min
        )}°</span>
                </p>
              </div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Kyiv");
