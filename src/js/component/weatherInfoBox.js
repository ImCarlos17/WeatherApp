import HTMLElement from "../factories.js/factorieHTML";

const boxWeather = (weatherInfo) => {
  const sectionWeather = HTMLElement({ elementType: "section" });

  const h1Location = HTMLElement({
    elementType: "h1",
    elementClass: "location",
    elementContent: `${weatherInfo.name}, ${weatherInfo.sys.country}`,
  });

  const paraDateTime = HTMLElement({
    elementType: "p",
    elementClass: "dateTime",
    elementContent: `${weatherInfo.date}`,
  });

  const paraTemperature = HTMLElement({
    elementType: "p",
    elementClass: `${weatherInfo.main.temp}°C`,
  });

  const paraWeatherDescription = HTMLElement({
    elementType: "p",
    elementClass: "weatherDescription",
    elementContent: `${weatherInfo.weather[0].description}`,
  });

  const paraWeatherInfo = HTMLElement({
    elementType: "p",
    elementClass: "weatherInfo",
    elementContent: `Feels like: ${weatherInfo.main.feels_like}°C, Humidity levels: ${weatherInfo.main.humidity}%, Wind: ${weatherInfo.wind.speed}k/m`,
  });

  sectionWeather.appendChild(h1Location);
  sectionWeather.appendChild(paraDateTime);
  sectionWeather.appendChild(paraTemperature);
  sectionWeather.appendChild(paraWeatherDescription);
  sectionWeather.appendChild(paraWeatherInfo);

  return sectionWeather;
};

export default boxWeather;
