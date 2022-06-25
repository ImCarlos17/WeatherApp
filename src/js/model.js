import PubSub from "pubsub-js";

const moduleWeatherData = (() => {
  const form = document.querySelector("form");
  const inputCity = document.querySelector("#city");
  const expRegCity = /^[A-Z]+$/i;
  const errorMsg = document.querySelector("span");
  const apiKey = "506bbcbbb0bf0d7bbf2ad10113bd22f4";

  const GET_DATA_WEATGER = "GET_DATA_WEATGER";

  const kelvinToCelcius = ({ temp, feels_like, humidity }) => {
    temp = Math.round((temp += -"273.15"));
    feels_like = Math.round((feels_like += -"273.15"));

    return { temp, feels_like, humidity };
  };

  const getFormtDateTime = (dt) => {
    dt = new Date(dt * 1000);
    return dt.toLocaleString();
  };

  const createWeaterObject = ({ name, sys, dt, main, weather, wind }) => {
    return {
      name,
      sys,
      dt: getFormtDateTime(dt),
      main: kelvinToCelcius(main),
      weather,
      wind,
    };
  };
  const weatherDataControl = (() => {
    let weatherDataMain = {};
    const set = (weatherData) => {
      weatherDataMain = weatherData;
    };

    const get = () => {
      return weatherDataMain;
    };

    return { get, set };
  })();

  const getWeatherData = async ({ lat, lon }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      const weatherData = await response.json();
      weatherDataControl.set(weatherData);
      PubSub.publish(GET_DATA_WEATGER, createWeaterObject(weatherData));
    } catch (error) {
      console.log(error);
    }
  };

  const getGeoLocate = async (city) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
      );

      const dataCity = await response.json();

      const geoLocateCity = { lat: dataCity[0].lat, lon: dataCity[0].lon };
      getWeatherData(geoLocateCity);
    } catch (error) {
      console.log(error);
    }
  };

  const checkInput = () => {
    if (expRegCity.test(inputCity.value)) {
      getGeoLocate(inputCity.value);
    } else {
      errorMsg.textContent = "this field should only contain letters";
    }
  };

  inputCity.addEventListener("click", () => {
    errorMsg.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInput();
    form.reset();
  });
})();

export { moduleWeatherData };