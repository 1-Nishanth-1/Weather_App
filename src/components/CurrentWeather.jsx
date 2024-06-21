import React, { useState, useEffect } from "react";
export const CurrWeather = ({ place, setPlace, weatherNow, setweatherNow }) => {
  //display weather at the moment
  return (
    <section className="container">
      <div className="row justify-content-center  ">
        {weatherNow && place && (
          <div className="col-7 weather-data rounded-4 border border-primary border-5">
            <h1 className="mb-0">
              {weatherNow.location.name}{" "}
              <span className="float-end">{weatherNow.current.temp_c}°C</span>{" "}
            </h1>
            <h3>
              {weatherNow.location.region}{" "}
              <span className="float-end">
                {weatherNow.current.condition.text}
              </span>
            </h3>
            <img src={weatherNow.current.condition.icon} alt="" />
          </div>
        )}
      </div>
    </section>
  );
};
