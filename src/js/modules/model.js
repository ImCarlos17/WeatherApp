import PubSub from "pubsub-js";
import moment from "moment";
import boxWeather from "../component/weatherInfoBox";
const mainContent = document.querySelector(".container-main");

const moduleWeatherData = (() => {
  const form = document.querySelector("form");
  const inputCity = document.querySelector("#city");
  const expRegCity = /^[a-zA-Z ]{2,254}/;
  const errorMsg = document.querySelector("span");
  const CITY = "CITY";
  const mainContent = document.querySelector(".container-main");

  const checkInput = () => {
    if (expRegCity.test(inputCity.value)) {
      PubSub.publish(CITY, inputCity.value);
    } else {
      errorMsg.textContent = "this field should only contain letters";
    }
  };

  inputCity.addEventListener("click", () => {
    errorMsg.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mainContent.innerHTML = "";
    checkInput();
    form.reset();
  });
})();

export { moduleWeatherData };
