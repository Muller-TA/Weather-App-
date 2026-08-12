import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import HourlyForecast from "./Components/HourlyForecast.jsx";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import WeatherStats from "./Components/WeatherStats.jsx";
import DailyForecast from "./Components/DailyForecast.jsx";

function App() {
  const [tempUnit, setTempUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");
  const [precipUnit, setPrecipUnit] = useState("mm");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [place, setPlace] = useState("Berlin");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorServer, setErrorServer] = useState(null);
  const [errorNotFound, setErrorNotFound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);

  const fetchAPI = async (city) => {
    try {
      setLoading(true);
      setErrorNotFound(null);
      setErrorServer(null);
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const data = await fetch(URL);
      if (!data.ok) {
        throw new Error("NOT_FOUND");
      }
      const jsonData = await data.json();
      setWeather(jsonData);
    } catch (error) {
      if (error.message === "NOT_FOUND") {
        setErrorNotFound(
          "City not found. Please check the spelling and try again.",
        );
      } else {
        setErrorServer(
          "We couldn't connect to the server (API error). Please try again in a few moments.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      setForecastLoading(true);
      setErrorNotFound(null);
      setErrorServer(null);
      const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      const data = await fetch(URL);
      if (!data.ok) {
        throw new Error("NOT_FOUND");
      }
      const jsonData = await data.json();
      setForecast(jsonData);
    } catch (error) {
      if (error.message === "NOT_FOUND") {
        setErrorNotFound(
          "City not found. Please check the spelling and try again.",
        );
      } else {
        setErrorServer(
          "We couldn't connect to the server (API error). Please try again in a few moments.",
        );
      }
    } finally {
      setForecastLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI(place);
    fetchForecast(place);
  }, [place]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-0 p-4 lg:p-6 max-w-[1280px] mx-auto">
      <Header
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        windUnit={windUnit}
        setWindUnit={setWindUnit}
        precipUnit={precipUnit}
        setPrecipUnit={setPrecipUnit}
      />
      <SearchBar onSearch={setPlace} />

      {!errorNotFound && !errorServer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 lg:mt-14">
          <div className="lg:col-span-2">
            <CurrentWeather weather={weather} tempUnit={tempUnit} />
            <WeatherStats
              weather={weather}
              tempUnit={tempUnit}
              windUnit={windUnit}
              precipUnit={precipUnit}
            />
            <DailyForecast forecast={forecast} tempUnit={tempUnit} />
          </div>
          <div className="lg:col-span-1">
            <HourlyForecast forecast={forecast} tempUnit={tempUnit} />
          </div>
        </div>
      )}

      {errorNotFound && (
        <div className="text-center py-12 lg:py-20">
          <p className="text-white text-xl">{errorNotFound}</p>
        </div>
      )}

      {errorServer && (
        <div className="text-center py-12 lg:py-20 flex flex-col items-center gap-4">
          <p className="text-white text-xl font-bold">Something went wrong</p>
          <p className="text-neutral-400">{errorServer}</p>
          <button
            onClick={() => {
              fetchAPI(place);
              fetchForecast(place);
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
