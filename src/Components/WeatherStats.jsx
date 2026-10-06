import {
  convertTemp,
  convertWind,
  convertPrecip,
  getTempUnit,
  getWindUnit,
  getPrecipUnit,
} from "../store/unitConversions.js";
import useWeatherStore from "../store/useWeatherStore.js";
function WeatherStats({ weather }) {
  const tempUnit = useWeatherStore((s) => s.tempUnit);
  const windUnit = useWeatherStore((s) => s.windUnit);
  const precipUnit = useWeatherStore((s) => s.precipUnit);

  if (!weather) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-neutral-800 rounded-lg p-4 animate-pulse">
            <div className="h-4 w-20 bg-neutral-700 rounded"></div>
            <div className="h-8 w-12 bg-neutral-700 rounded mt-3"></div>
          </div>
        ))}
      </div>
    );
  }
  const stats = [
    {
      label: "Feels Like",
      value: `${convertTemp(weather.main.feels_like, tempUnit)}°`,
    },
    { label: "Humidity", value: `${weather.main.humidity} %` },
    {
      label: "Wind",
      value: `${convertWind(weather.wind.speed, windUnit)} ${getWindUnit(windUnit)}`,
    },
    {
      label: "Precipitation",
      value: `${convertPrecip(weather.rain?.["1h"] ?? 0, precipUnit)} ${getPrecipUnit(precipUnit)}`,
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {" "}
      {stats.map((stat, index) => (
        <div key={index} className="bg-neutral-800 rounded-lg p-4">
          <h4 className="text-sm text-neutral-300">{stat.label}</h4>
          <p className="text-3xl mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
export default WeatherStats;
