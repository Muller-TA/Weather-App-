import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  place: "Berlin",
  tempUnit: "celsius",
  windUnit: "kmh",
  precipUnit: "mm",
  setPlace: (place) => set({ place }),
  setTempUnit: (tempUnit) => set({ tempUnit }),
  setWindUnit: (windUnit) => set({ windUnit }),
  setPrecipUnit: (precipUnit) => set({ precipUnit }),
});

export default create(devtools(persist(store)));
