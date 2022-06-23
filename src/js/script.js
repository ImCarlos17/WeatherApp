import "../css/style.css";

const form = document.querySelector("form");
const inputCity = document.querySelector("#city");
const expRegCity = /^[A-Z]+$/i;
const errorMsg = document.querySelector("span");
const apiKey = "506bbcbbb0bf0d7bbf2ad10113bd22f4";

const weatherModule = (() => {
  const getWeatherData = async ({ lat, lon }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      const weatherData = await response.json();
      const weatherActual = weatherData["weather"];
      console.log(weatherData);
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

  return { getGeoLocate };
})();

const checkInput = () => {
  if (expRegCity.test(inputCity.value)) {
    weatherModule.getGeoLocate(inputCity.value);
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
