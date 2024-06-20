import React from "react";
import { useState, useEffect } from "react";

export const TodaysWeather = ({
  place,
  setPlace,
  weatherNow,
  setweatherNow,
}) => {
  return (
    <section className="container">
      <div className="row justify-content-center ">
        {weatherNow && place && (
          <div className="col-7">
            <h1 className="mb-0">
              {weatherNow.location.name}{" "}
              <span className="float-end">
                {weatherNow.forecast.forecastday[0].day.maxtemp_c}°C
              </span>{" "}
            </h1>
            <h3>
              {weatherNow.location.region}{" "}
              <span className="float-end">
                {weatherNow.forecast.forecastday[0].day.mintemp_c}°C
              </span>
            </h3>
          </div>
        )}
      </div>
      <div className="row text-center"></div>
    </section>
  );
};
