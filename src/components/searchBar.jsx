import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export const SearchBar = ({ setPlace }) => {
  const [inputPlace, setInputPlace] = useState("");
  const [inputList, setInputList] = useState([]);

  //input change handling
  const handleChangeInput = (event) => {
    setInputPlace(event.target.value);
  };

  //getting place as input

  const gettingPlace = (event) => {
    event.preventDefault();
    setPlace(inputPlace.split(",")[0]);
    console.log(inputPlace.split(",")[0]);
    setInputPlace("");
  };
  useEffect(() => {
    if (inputPlace) {
      fetch(
        `https://api.weatherapi.com/v1/search.json?key=452c79a4fa6e4e3684944412242006&q=${inputPlace}&aqi=no`
      )
        .then((response) => response.json())
        .then((response) => setInputList(response));
      console.log(inputList);
    } else {
      setInputList([]);
    }
  }, [inputPlace]);
  return (
    <header className=" m-0 p-0 ">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
        <div className="container-fluid">
          <NavLink to="/" className="logo navbar-brand">
            {" "}
            Weather-App
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/todaysweather"
                >
                  Todays Weather
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={gettingPlace}>
              <input
                type="search"
                className="form-control mr-sm-2 "
                list="place"
                value={inputPlace}
                onChange={handleChangeInput}
                placeholder="Search Location"
              />
              <datalist id="place">
                {inputList.map((item) => (
                  <option key={item.id}>
                    {item.name}, {item.region}
                  </option>
                ))}
              </datalist>
              <button className="btn btn-outline-success m-2" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};
