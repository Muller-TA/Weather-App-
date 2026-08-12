import bgLarge from "../assets/images/bg-today-large.svg";
import sunnyIcon from "../assets/images/icon-sunny.webp";
import { getWeatherIcon } from "../weatherIcon";
import { convertTemp, getTempUnit } from "../unitConversions.js";
function CurrentWeather({ weather, tempUnit }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!weather) {
    return (
      <div className="rounded-2xl p-8 flex flex-col items-center justify-center bg-neutral-800 w-full min-h-[15rem] gap-3">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2.5 h-2.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2.5 h-2.5 bg-neutral-400 rounded-full animate-bounce"></div>
        </div>
        <p className="text-neutral-400">Loading</p>
      </div>
    );
  }
  return (
    <div
      className="rounded-2xl p-8 flex justify-between items-center bg-cover bg-center bg-no-repeat w-full min-h-[15rem]"
      style={{ backgroundImage: `url(${bgLarge})` }}
    >
      <div>
        <h2 className="text-2xl font-bold whitespace-nowrap">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="text-neutral-200 mt-1">{today}</p>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={getWeatherIcon(weather.weather[0].main)}
          alt={weather.weather[0].main}
          className="w-20 h-20"
        />{" "}
        <span className="text-7xl font-display  italic">
          {convertTemp(Math.round(weather.main.temp), tempUnit)}°
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
