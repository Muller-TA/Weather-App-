import weatherIcon from "../assets/images/logo.svg";
import { Settings, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import useWeatherStore from "../store/useWeatherStore.js";
function Header() {
  const tempUnit = useWeatherStore((s) => s.tempUnit);
  const setTempUnit = useWeatherStore((s) => s.setTempUnit);
  const windUnit = useWeatherStore((s) => s.windUnit);
  const setWindUnit = useWeatherStore((s) => s.setWindUnit);
  const precipUnit = useWeatherStore((s) => s.precipUnit);
  const setPrecipUnit = useWeatherStore((s) => s.setPrecipUnit);
  const [isOpen, setIsOpen] = useState(false);
  const isAllMetric =
    tempUnit === "celsius" && windUnit === "kmh" && precipUnit === "mm";

  const handleSwitchAll = () => {
    if (isAllMetric) {
      setTempUnit("fahrenheit");
      setWindUnit("mph");
      setPrecipUnit("in");
    } else {
      setTempUnit("celsius");
      setWindUnit("kmh");
      setPrecipUnit("mm");
    }
  };

  return (
    <header className="container mx-auto flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <img src={weatherIcon} alt="Weather Icon" />
      </div>
      <button
        className="flex items-center gap-3 bg-neutral-800 h-12 px-4 rounded-lg text-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings size={18} className="text-neutral-0" />
        <span>Units</span>
        <ChevronDown size={18} className="text-neutral-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-neutral-800 rounded-lg overflow-hidden z-10 min-w-[220px] py-1">
          <button
            onClick={handleSwitchAll}
            className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-neutral-700 border-b-2 border-neutral-700 text-sm"
          >
            <Settings size={14} />
            {isAllMetric ? "Switch to Imperial" : "Switch to Metric"}
          </button>

          <div className="px-4 pt-3 pb-1 text-neutral-400 text-xs ">
            Temperature
          </div>
          <button
            onClick={() => setTempUnit("celsius")}
            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
          >
            <span>Celsius (°C)</span>
            {tempUnit === "celsius" && <Check size={16} />}
          </button>
          <button
            onClick={() => setTempUnit("fahrenheit")}
            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
          >
            <span>Fahrenheit (°F)</span>
            {tempUnit === "fahrenheit" && <Check size={16} />}
          </button>
          <div className="border-b-2 border-neutral-700 mx-3 "></div>
          <div className="px-4 pt-3 pb-1 text-neutral-400 text-xs ">
            Wind Speed
          </div>
          <button
            onClick={() => setWindUnit("kmh")}
            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
          >
            <span>km/h</span>
            {windUnit === "kmh" && <Check size={16} />}
          </button>
          <button
            onClick={() => setWindUnit("mph")}
            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
          >
            <span>mph</span>
            {windUnit === "mph" && <Check size={16} />}
          </button>
          <div className="border-b-2 border-neutral-700 mx-3"></div>
          <div className="px-4 pt-3 pb-1 text-neutral-400 text-xs">
            Precipitation
          </div>
          <button
            onClick={() => setPrecipUnit("mm")}
            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
          >
            <span>Millimeters (mm)</span>
            {precipUnit === "mm" && <Check size={16} />}
          </button>
          <button
            onClick={() => setPrecipUnit("in")}
            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
          >
            <span>Inches (in)</span>
            {precipUnit === "in" && <Check size={16} />}
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
