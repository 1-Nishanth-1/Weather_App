import { useState, useEffect } from "react";
import { SearchBar } from "./components/searchBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CurrWeather } from "./components/CurrentWeather";
import { TodaysWeather } from "./components/todaysWeather";
import "bootstrap/dist/css/bootstrap.min.css";
import { FutureWeather } from "./components/futureWeather";

function App() {
  const [place, setPlace] = useState(() => {
    return localStorage.getItem("weatherAppPlace") || "";
  });
  const [weatherNow, setweatherNow] = useState(null);

  useEffect(() => {
    if (place) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=452c79a4fa6e4e3684944412242006&q=${place}&aqi=no&days=14`
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            window.alert(
              `Error fetching weather data: ${response.error.message}`
            );
          } else {
            setweatherNow(response);
            localStorage.setItem("weatherAppPlace", place);
          }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
      sessionStorage.setItem("weatherAppPlace", place);
    } else {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => setPlace(data.ip))
        .catch((error) => console.error("Error fetching IP address:", error));
    }
  }, [place, setweatherNow]);

  return (
    <>
      <BrowserRouter>
        <SearchBar setPlace={setPlace} />
        <Routes>
          <Route
            path="/"
            element={
              <CurrWeather
                place={place}
                setPlace={setPlace}
                weatherNow={weatherNow}
                setweatherNow={setweatherNow}
              />
            }
          ></Route>
          {weatherNow && (
            <>
              <Route
                path="todaysweather"
                element={
                  <TodaysWeather
                    weatherNow={weatherNow.forecast.forecastday[0]}
                    location={weatherNow.location}
                  />
                }
              />
              <Route
                path="futureweather"
                element={<FutureWeather weatherNow={weatherNow} />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
