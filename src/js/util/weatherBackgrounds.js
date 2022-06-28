import clearSkyDay from "../../img/weather-backgrounds/clear-sky-day.jpg";
import clearSkyNight from "../../img/weather-backgrounds/clear-sky-night.jpg";
import cloudsDay from "../../img/weather-backgrounds/clouds-day.jpg";
import cloudsNight from "../../img/weather-backgrounds/clouds-night.jpg";
import mistDay from "../../img/weather-backgrounds/mist-day.jpg";
import mistNight from "../../img/weather-backgrounds/mist-night.jpg";
import rainDay from "../../img/weather-backgrounds/rain-day.jpg";
import rainNight from "../../img/weather-backgrounds/mist-night.jpg";
import snowDay from "../../img/weather-backgrounds/snow-day.jpg";
import snowNight from "../../img/weather-backgrounds/snow-night.jpg";
import thunderStormDay from "../../img/weather-backgrounds/thunderstorm-day.jpg";
import thunderStormNight from "../../img/weather-backgrounds/thunderstorm-night.jpg";
import isDayTime from "./getDayOrNight";
import getWeatherFromCode from "./weatherCodes";

const getWeatherBackground = (weatherCode, date) => {
  const weather = getWeatherFromCode(weatherCode);
  const time = isDayTime(date) ? "day" : "night";

  return backgroundsObject[weather][time];
};

const backgroundsObject = {
  clear: {
    day: clearSkyDay,
    night: clearSkyNight,
  },
  clouds: {
    day: cloudsDay,
    night: cloudsNight,
  },
  atmosphere: {
    day: mistDay,
    night: mistNight,
  },
  rain: {
    day: rainDay,
    night: rainNight,
  },
  snow: {
    day: snowDay,
    night: snowNight,
  },
  thunderStorm: {
    day: thunderStormDay,
    night: thunderStormNight,
  },
};

export default getWeatherBackground;
