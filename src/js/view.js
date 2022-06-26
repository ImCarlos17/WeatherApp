import PubSub from "pubsub-js";

const GET_DATA_WEATGER = "GET_DATA_WEATGER";
const location = document.querySelector(".location");
const weatherDescription = document.querySelector(".weatherDescription");
const temperature = document.querySelector(".temperature");
const weatherInfoDescription = document.querySelector(".weatherInfo");
const dateTime = document.querySelector(".dateTime");

const moduleView = (() => {
  const renderWeatherInfo = (msg, weatherInfo) => {
    console.log(weatherInfo);
    location.textContent = `${weatherInfo.name}, ${weatherInfo.sys.country}`;
    dateTime.textContent = `${weatherInfo.dt}`;
    temperature.textContent = `${weatherInfo.main.temp}°C`;
    weatherDescription.textContent = `${weatherInfo.weather[0].description}`;
    weatherInfoDescription.textContent = `Feels like: ${weatherInfo.main.feels_like}°C, Humidity levels: ${weatherInfo.main.humidity}%, Wind: ${weatherInfo.wind.speed}k/m`;
  };

  PubSub.subscribe(GET_DATA_WEATGER, renderWeatherInfo);
})();
