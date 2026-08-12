import sunnyIcon from "./assets/images/icon-sunny.webp";
import partlyCloudyIcon from "./assets/images/icon-partly-cloudy.webp";
import overcastIcon from "./assets/images/icon-overcast.webp";
import rainIcon from "./assets/images/icon-rain.webp";
import drizzleIcon from "./assets/images/icon-drizzle.webp";
import stormIcon from "./assets/images/icon-storm.webp";
import snowIcon from "./assets/images/icon-snow.webp";
import fogIcon from "./assets/images/icon-fog.webp";

export const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return sunnyIcon;
    case "Clouds":
      return partlyCloudyIcon;
    case "Rain":
      return rainIcon;
    case "Drizzle":
      return drizzleIcon;
    case "Thunderstorm":
      return stormIcon;
    case "Snow":
      return snowIcon;
    case "Mist":
    case "Fog":
    case "Haze":
      return fogIcon;
    default:
      return sunnyIcon;
  }
};
