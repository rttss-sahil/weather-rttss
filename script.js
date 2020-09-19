navigator.geolocation.getCurrentPosition(getLatLon);
const Area = document.getElementById("location");
const Temp = document.getElementById("temp");
const Icon = document.getElementById("svg");
const celFer = document.getElementById("celFer");
const getCorrectIcon = (weather) => {
  switch (weather) {
    case "drizzle":
      document.querySelector(".sun-shower").classList.remove("hide");
      break;
    case "clouds":
      document.querySelector(".cloudy").classList.remove("hide");
      break;
    case "rain":
      document.querySelector(".rainy").classList.remove("hide");
      break;
    case "snow":
      document.querySelector(".flurries").classList.remove("hide");
      break;
    case "clear":
      document.querySelector(".sunny").classList.remove("hide");
      break;
    case "thunderstom":
      document.querySelector(".thunder-storm").classList.remove("hide");
      break;
    default:
      break;
  }
};
const getWeatherData = async (lat, lon) => {
  await fetch(
    `https://fcc-weather-api.glitch.me/api/current?lat=${Math.floor(
      lat
    )}&lon=${Math.floor(lon)}`
  )
    .then((res) => res.json())
    .then((data) => {
      Area.innerHTML = `${data.name}, ${data.sys.country}`;
      Temp.innerText = `${Math.floor(data.main.temp)}`;
      getCorrectIcon(data.weather[0].main.toLowerCase());
    });
};
function getLatLon(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getWeatherData(latitude, longitude);
}
const toFeh = () => {
  console.log(celFer.innerText.toLowerCase());
  switch (celFer.innerText.toLowerCase()) {
    case "c":
      Temp.innerText = Math.round(+Temp.innerText * (9 / 5) + 32);
      celFer.innerText = "F";
      break;
    case "f":
      Temp.innerText = Math.round((+Temp.innerText - 32) * (5 / 9));
      celFer.innerText = "C";
      break;
    default:
      break;
  }
};
celFer.addEventListener("click", toFeh);
