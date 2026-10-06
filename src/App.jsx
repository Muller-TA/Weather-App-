import { useQuery } from "@tanstack/react-query";
import "./App.css";
import Header from "./Components/Header.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import HourlyForecast from "./Components/HourlyForecast.jsx";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import WeatherStats from "./Components/WeatherStats.jsx";
import DailyForecast from "./Components/DailyForecast.jsx";
import useWeatherStore from "./store/useWeatherStore.js";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchWeather = async (endpoint, place) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/${endpoint}?q=${encodeURIComponent(place)}&appid=${API_KEY}&units=metric`,
  );
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error("SERVER_ERROR");
  return res.json();
};

function App() {
  const place = useWeatherStore((s) => s.place);
  const weatherQuery = useQuery({
    queryKey: ["weather", place],
    queryFn: () => fetchWeather("weather", place),
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", place],
    queryFn: () => fetchWeather("forecast", place),
  });

  const weatherData = weatherQuery.data;
  const forecastData = forecastQuery.data;

  const isError = weatherQuery.isError || forecastQuery.isError;
  const isErrorNotFound =
    weatherQuery.error?.message === "NOT_FOUND" ||
    forecastQuery.error?.message === "NOT_FOUND";

  const handleRetry = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 p-4 lg:p-6 max-w-[1280px] mx-auto">
      <Header />
      <SearchBar />

      {!isErrorNotFound && !isError && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 lg:mt-14">
          <div className="lg:col-span-2">
            <CurrentWeather weather={weatherData} />
            <WeatherStats weather={weatherData} />
            <DailyForecast forecast={forecastData} />
          </div>
          <div className="lg:col-span-1">
            <HourlyForecast forecast={forecastData} />
          </div>
        </div>
      )}
      {isErrorNotFound && (
        <div className="text-center py-12 lg:py-20">
          <p className="text-white text-xl">No results found for {place}</p>
        </div>
      )}
      {isError && !isErrorNotFound && (
        <div className="text-center py-12 lg:py-20 flex flex-col items-center gap-4">
          <p className="text-white text-xl font-bold">Something went wrong</p>
          <p className="text-neutral-400">
            {weatherQuery.error?.message || forecastQuery.error?.message}
          </p>
          <button
            onClick={() => {
              handleRetry();
            }}
            className="bg-neutral-800 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
