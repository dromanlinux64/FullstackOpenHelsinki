import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getWeather = (prospes) => {
  const [lat, long] = prospes;
  const WeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`;
  const request = axios.get(WeatherURL);
  return request.then((response) => response.data);
};
const descriptionCodeWMO = (code) => {
  const codesWMO = [
    { code: 0, description: "Clear sky" },
    { code: 1, description: "Mainly clear, partly cloudy, and overcast" },
    { code: 2, description: "Mainly clear, partly cloudy, and overcast" },
    { code: 3, description: "Mainly clear, partly cloudy, and overcast" },
    { code: 45, description: "Fog and depositing rime fog" },
    { code: 48, description: "Fog and depositing rime fog" },
    { code: 51, description: "Drizzle: Light, moderate, and dense intensity" },
    { code: 53, description: "Drizzle: Light, moderate, and dense intensity" },
    { code: 55, description: "Drizzle: Light, moderate, and dense intensity" },
    { code: 56, description: "Freezing Drizzle: Light and dense intensity" },
    { code: 57, description: "Freezing Drizzle: Light and dense intensity" },
    { code: 61, description: "Rain: Slight, moderate and heavy intensity" },
    { code: 63, description: "Rain: Slight, moderate and heavy intensity" },
    { code: 65, description: "Rain: Slight, moderate and heavy intensity" },
    { code: 66, description: "Freezing Rain: Light and heavy intensity" },
    { code: 67, description: "Freezing Rain: Light and heavy intensity" },
    {
      code: 71,
      description: "Snow fall: Slight, moderate, and heavy intensity",
    },
    {
      code: 73,
      description: "Snow fall: Slight, moderate, and heavy intensity",
    },
    {
      code: 75,
      description: "Snow fall: Slight, moderate, and heavy intensity",
    },
    { code: 77, description: "Snow grains" },
    { code: 80, description: "Rain showers: Slight, moderate, and violent" },
    { code: 81, description: "Rain showers: Slight, moderate, and violent" },
    { code: 82, description: "Rain showers: Slight, moderate, and violent" },
    { code: 85, description: "Snow showers slight and heavy" },
    { code: 86, description: "Snow showers slight and heavy" },
    { code: 95, description: "Thunderstorm: Slight or moderate" },
    { code: 96, description: "Thunderstorm with slight and heavy hail" },
    { code: 99, description: "Thunderstorm with slight and heavy hail" },
  ];

  //console.log("descriptionCodeWMO",code)
  const wmoObj = codesWMO.find((obj) => obj.code === code);
  if (wmoObj) {
    return wmoObj.description;
  }
  return "Weather Not Available";
};

export default { getAll, descriptionCodeWMO, getWeather };
