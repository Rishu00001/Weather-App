const inputbox = document.querySelector(".inputbox");
const searchButton = document.getElementById("searchButton");
const weather_image = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const location_not_found = document.querySelector('.location-not-found'); 
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const weather_body = document.querySelector('.weather-body');
const currCity = document.querySelector('.currCity');
const apikey = "79ec922cbb165a0205e4217c9c457bb8";

const checkWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then((weather_data) => {
      location_not_found.style.display = "none";
      weather_body.style.display = "flex";
      currCity.innerHTML = `${weather_data.name}`;
      temperature.innerHTML = `${Math.ceil(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
      description.innerHTML = `${weather_data.weather[0].description}`;
      humidity.innerHTML = `${weather_data.main.humidity}%`;
      wind_speed.innerHTML = `${Math.ceil((weather_data.wind.speed) * 3.6)}Km/H`;

      switch (weather_data.weather[0].main) {
        case 'Clouds':
          weather_image.src = "./assets/cloud.png";
          break;
        case 'Clear':
          weather_image.src = "./assets/clear.png";
          break;
        case 'Rain':
          weather_image.src = "./assets/rain.png";
          break;
        case 'Mist':
          weather_image.src = "./assets/mist.png";
          break;
        case 'Snow':
          weather_image.src = "./assets/snow.png";
          break;
        default:
          weather_image.src = "./assets/default.png"; 
      }
    })
    .catch((error) => {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      console.error(error); 
    });
};

searchButton.addEventListener("click", () => {
  const city = inputbox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
