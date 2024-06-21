import React from "react";
import { useState, useEffect } from "react";

export const TodaysWeather = ({ weatherNow, location }) => {
  return (
    <section className="container">
      {weatherNow && (
        <>
          <div className="row justify-content-center mb-4 mt-2 ">
            <div className="col-7">
              <h1 className="mb-0">
                {location.name}{" "}
                <span className="float-end">{weatherNow.day.maxtemp_c}°C</span>{" "}
              </h1>
              <h3>
                {location.region}{" "}
                <span className="float-end">{weatherNow.day.mintemp_c}°C</span>
              </h3>
              <h4>
                {weatherNow.day.condition.text}
                <img
                  src={weatherNow.day.condition.icon}
                  alt=""
                  className="float-end"
                />
              </h4>
            </div>
          </div>
          <div className="row text-center">
            {weatherNow.hour.map((hour) => (
              <div
                className="col-1 d-flex flex-column py-3 px-3"
                key={hour.date_epoch}
              >
                <h4>{hour.time.split(" ")[1]}</h4>
                <img src={hour.condition.icon} alt="" />
                <h4>{hour.temp_c}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
