export const convertTemp = (celsius, tempUnit) => {
  if (tempUnit === "fahrenheit") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
};

export const convertWind = (metersPerSecond, windUnit) => {
  if (windUnit === "mph") {
    return Math.round(metersPerSecond * 2.237); // m/s → mph
  }
  return Math.round(metersPerSecond * 3.6); // m/s → km/h
};

export const convertPrecip = (mm, precipUnit) => {
  if (precipUnit === "in") {
    return (mm * 0.0393701).toFixed(2); // mm → inches
  }
  return mm;
};

export const getTempUnit = (tempUnit) =>
  tempUnit === "fahrenheit" ? "°F" : "°C";
export const getWindUnit = (windUnit) => (windUnit === "mph" ? "mph" : "km/h");
export const getPrecipUnit = (precipUnit) =>
  precipUnit === "in" ? "in" : "mm";
