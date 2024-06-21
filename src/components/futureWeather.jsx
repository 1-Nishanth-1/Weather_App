import React, { useState, useEffect } from "react";
import { TodaysWeather } from "./todaysWeather";
export const FutureWeather = ({ weatherNow }) => {
  const [futureDay, setFutureDay] = useState(1);
  const [DatetoFind, setDatetoFind] = useState();
  const [VeryFuture, setVeryFuture] = useState(null);

  const selectNewDay = (index) => {
    setFutureDay(index);
    window.scrollTo(0, 0);
  };
  //different date working
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundIndex = weatherNow.forecast.forecastday.findIndex(
      (item) => item.date === DatetoFind
    );
    if (foundIndex !== -1) {
      setFutureDay(foundIndex);
    } else {
      fetch(
        `https://api.weatherapi.com/v1/future.json?key=452c79a4fa6e4e3684944412242006&q=trivandrum&aqi=no&dt=${DatetoFind}`
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            window.alert("Invalid Date");
          } else {
            setFutureDay(14);
            setVeryFuture(response);
          }
        });
    }
  };
  const handleDateChange = (e) => {
    setDatetoFind(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit} className="mb-3 col-md-3 col-9">
            <input
              type="date"
              value={DatetoFind}
              onChange={handleDateChange}
              className="form-control "
              required
            />
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
      {futureDay === 14 ? (
        <>
          <h1 className="text-center">
            {VeryFuture.forecast.forecastday[0].date}
          </h1>
          <TodaysWeather
            weatherNow={VeryFuture.forecast.forecastday[0]}
            location={VeryFuture.location}
          />
        </>
      ) : (
        <>
          <h1 className="text-center">
            {weatherNow.forecast.forecastday[futureDay].date}
          </h1>
          <TodaysWeather
            weatherNow={weatherNow.forecast.forecastday[futureDay]}
            location={weatherNow.location}
          />
        </>
      )}

      <div className="container">
        <div className="row  m-2 justify-content-center ">
          {weatherNow.forecast.forecastday?.map((item, index) => (
            <h4
              className={`col-md-5 ol-10 border border-primary rounded-pill border-3 p-3 m-3 weather-data ${
                index === futureDay ? "border-danger border-5" : ""
              }`}
              onClick={() => selectNewDay(index)}
            >
              {item.date}
              <img
                src={item.day.condition.icon}
                alt={item.day.condition.text}
              />
              <span className="float-end">
                {item.day.maxtemp_c}/{item.day.mintemp_c}
              </span>
            </h4>
          ))}
        </div>
      </div>
    </>
  );
};
