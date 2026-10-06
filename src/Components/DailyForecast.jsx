import { getWeatherIcon } from "../store/weatherIcon.js";
import { convertTemp } from "../store/unitConversions.js";
import useWeatherStore from "../store/useWeatherStore.js";
function DailyForecast({ forecast }) {
  const tempUnit = useWeatherStore((s) => s.tempUnit);
  if (!forecast) {
    return (
      <div className="mt-8">
        <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-3"></div>
        <div className="grid grid-cols-3 lg:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="bg-neutral-800 rounded-lg p-3 flex flex-col items-center gap-2 animate-pulse"
            >
              <div className="h-4 w-8 bg-white/10 rounded"></div>
              <div className="w-10 h-10 bg-white/10 rounded-full"></div>
              <div className="flex justify-between w-full">
                <div className="h-4 w-6 bg-white/10 rounded"></div>
                <div className="h-4 w-6 bg-white/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const grouped = forecast.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);

    return acc;
  }, {});
  return (
    <div className="mt-8">
      <h3 className="font-bold text-lg mb-3">Daily forecast</h3>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {" "}
        {Object.keys(grouped).map((date, index) => {
          const dayItems = grouped[date];
          const temps = dayItems.map((entry) => entry.main.temp);
          const high = convertTemp(Math.max(...temps), tempUnit);
          const low = convertTemp(Math.min(...temps), tempUnit);
          const getDayName = (date) =>
            new Date(date).toLocaleDateString("en-US", { weekday: "long" });
          return (
            <div
              key={index}
              className="bg-neutral-800 rounded-lg p-3 flex flex-col items-center gap-2"
            >
              <span>{getDayName(date)}</span>
              <img
                src={getWeatherIcon(dayItems[0].weather[0].main)}
                alt=""
                className="w-10 h-10"
              />
              <div className="flex justify-between w-full text-sm">
                <span>{high}°</span>
                <span className="text-neutral-300">{low}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DailyForecast;
