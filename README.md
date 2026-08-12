# Weather Now

A weather app that lets you search any city and see current conditions, an hourly forecast, and a 5-day outlook — with full control over which units everything is displayed in.

**[Live Demo](#)** <!-- add your deployed link here -->
**Frontend Mentor Challenge:** [Weather app](https://www.frontendmentor.io/challenges/weather-app)

## What it does

- Search any city and get live weather data
- Hourly forecast in 3-hour steps, switchable by day
- 5-day forecast with daily highs and lows
- Independent unit switching for temperature (°C/°F), wind speed (km/h/mph), and precipitation (mm/in), plus a single toggle that switches all three at once
- Weather icon changes based on actual conditions (clear, clouds, rain, drizzle, storm, snow, fog)
- Skeleton loading screens shaped like the real content, instead of a generic spinner
- Two distinct error states: an invalid city search vs. a server/network failure (with a retry button)
- Search by pressing Enter, not just clicking the button
- Responsive layout for mobile and desktop

## Built with

- React (Hooks)
- Vite
- Tailwind CSS
- Lucide React (icons)
- [OpenWeatherMap API](https://openweathermap.org/api) — Current Weather + 5 Day / 3 Hour Forecast (free tier)

I used OpenWeatherMap instead of the Open-Meteo API suggested in the original challenge, since I was already familiar with it and it let me practice reading and combining data from two related endpoints.

## Running it locally

You'll need a free API key from [OpenWeatherMap](https://openweathermap.org/api) (no card required).

```bash
git clone https://github.com/Muller-TA/Weather-App-.git
cd Weather-App-
npm install
```

Create a `.env` file in the root:

```
VITE_API_KEY=your_openweathermap_api_key
```

Then:

```bash
npm run dev
```

## Notable decisions and problems I ran into

**Free tier, not the paid One Call API.** OpenWeatherMap's One Call API returns hourly and daily forecasts already organized for you, but it requires billing info even on the free plan. I stuck with the basic `/forecast` endpoint instead, which only gives 3-hour steps over 5 days as one flat list of 40 entries — no daily breakdown built in.

**Building the daily forecast myself.** Since there's no ready-made "day" object, I grouped the 40 forecast entries by date with `reduce()`, then pulled the highest and lowest temperature out of each group with `Math.max()` / `Math.min()` to build each day's card.

**Converting units without re-fetching.** Rather than hitting the API again every time someone changes units (extra latency, extra calls against the free tier's rate limit), everything is fetched once in metric and converted on the fly when rendering. Temperature, wind, and precipitation each have their own unit state, so they can be changed independently or all together with the "Switch to Imperial/Metric" shortcut.

**Splitting "not found" from "server error".** Early on, every failed fetch showed the same generic message. I split it into two states — one for an invalid city name, one for an actual connection/server failure — so the second one can show a Retry button instead of just telling the user their search was wrong when it wasn't.

## A note on the API key

This is a purely client-side app, so the API key ends up bundled into the built JavaScript and is technically visible to anyone who inspects the deployed site. That's an acceptable trade-off for a learning/portfolio project — in a production app handling real traffic, the key would sit behind a backend so the browser never sees it.

## Author

- GitHub - [@Muller-TA](https://github.com/Muller-TA)
