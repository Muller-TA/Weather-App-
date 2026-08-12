import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { getWeatherIcon } from "../weatherIcon";
import { convertTemp, getTempUnit } from "../unitConversions.js";
function HourlyForecast({ forecast, tempUnit }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  if (!forecast) {
    return (
      <div className="bg-neutral-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-white/10 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-neutral-700 rounded-lg px-3 py-3 animate-pulse"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                <div className="h-4 w-12 bg-white/10 rounded"></div>
              </div>
              <div className="h-4 w-8 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const availableDays = [
    ...new Set(forecast.list.map((item) => item.dt_txt.split(" ")[0])),
  ];
  const effectiveDay = selectedDay || availableDays[0];
  const hourlyData = forecast.list.filter(
    (item) => item.dt_txt.split(" ")[0] === effectiveDay,
  );
  const getDayName = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
  return (
    <div className="bg-neutral-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-3 relative">
        <h3 className="font-bold text-lg">Hourly forecast</h3>
        <button
          className="flex items-center gap-2 bg-neutral-700 px-3 py-2 rounded-lg text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{getDayName(effectiveDay)}</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-neutral-700 rounded-lg overflow-hidden z-10">
            {availableDays.map((day, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-neutral-600"
                onClick={() => {
                  setSelectedDay(day);
                  setIsOpen(false);
                }}
              >
                {getDayName(day)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {hourlyData.map((item, index) => {
          const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });
          return (
            <div
              key={index}
              className="flex justify-between items-center bg-neutral-700 rounded-lg px-3 py-3"
            >
              <div className="flex items-center gap-2">
                <img
                  src={getWeatherIcon(item.weather[0].main)}
                  alt=""
                  className="w-6 h-6"
                />{" "}
                <span>{time}</span>
              </div>
              <span>{convertTemp(item.main.temp, tempUnit)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default HourlyForecast;
