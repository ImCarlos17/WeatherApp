import moment from "moment";
import PubSub from "pubsub-js";

const CITY = "CITY";
const GET_DATA_WEATGER = "GET_DATA_WEATGER";
const apiKey = "506bbcbbb0bf0d7bbf2ad10113bd22f4";

const getDateTime = ({ dt, timezone }) => {
  let date = moment(dt + timezone);
  date = moment.utc(date * 1000).format("LLLL");
  return date;
};

const kelvinToCelcius = ({ temp, feels_like, humidity }) => {
  temp = Math.round((temp += -"273.15"));
  feels_like = Math.round((feels_like += -"273.15"));

  return { temp, feels_like, humidity };
};

const weatherInfoMain = (city) => {
  const weatherObject = {
    name: city.name,
    sys: city.sys,
    timezone: city.timezone,
    date: getDateTime(city),
    weather: city.weather,
    main: kelvinToCelcius(city.main),
    wind: city.wind,
  };
  PubSub.publish(GET_DATA_WEATGER, weatherObject);
};

const getWeatherInfo = async ({ lat, lon }) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const weatherData = await response.json();
    weatherInfoMain(weatherData);
  } catch (error) {
    console.log(error);
  }
};

const getGeoLocate = async (msg, city) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    );

    const dataCity = await response.json();
    getWeatherInfo(dataCity[0]);
  } catch (error) {
    console.log(error);
  }
};

PubSub.subscribe(CITY, getGeoLocate);

export default weatherInfoMain;
