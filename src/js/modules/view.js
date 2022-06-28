import PubSub from "pubsub-js";
import weatherInfoMain from "./ weatherFechtApi";
import boxWeather from "../component/weatherInfoBox";
import getWeatherBackground from "../util/weatherBackgrounds";

const GET_DATA_WEATGER = "GET_DATA_WEATGER";
const mainContent = document.querySelector(".container-main");
const container = document.querySelector(".container");

const renderWeatherInfo = (msg, weatherInfo) => {
  const boxWeatherElement = boxWeather(weatherInfo);
  mainContent.appendChild(boxWeatherElement);
};

const renderBackGroundImg = (msg, weatherInfo) => {
  const findedBackgroundImg = getWeatherBackground(
    weatherInfo.weather[0].id,
    weatherInfo.date
  );
  container.style.background = `url(${findedBackgroundImg}) no-repeat center center fixed`;
  container.style.backgroundSize = "cover";
};

PubSub.subscribe(GET_DATA_WEATGER, renderWeatherInfo);
PubSub.subscribe(GET_DATA_WEATGER, renderBackGroundImg);

export default renderWeatherInfo;
