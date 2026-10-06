import { Search } from "lucide-react";
import { useState } from "react";
import useWeatherStore from "../store/useWeatherStore.js";
function SearchBar() {
  const onSearch = useWeatherStore((s) => s.setPlace);
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      onSearch(inputValue);
    }
  };
  return (
    <>
      <div className="my-4">
        <h2 className="text-3xl lg:text-5xl font-display font-bold text-center">
          {" "}
          How's the sky looking today?
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4 px-4 sm:px-0">
        <div className="relative w-full sm:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"
          />
          <input
            type="text"
            placeholder="Search for a Place..."
            className="bg-neutral-800 text-neutral-0 pl-10 pr-4 py-2 rounded-lg w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <button
          className="bg-blue-500 px-6 py-2 rounded-lg text-neutral-0 w-full sm:w-auto"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
}
export default SearchBar;
