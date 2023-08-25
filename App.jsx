import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";
const App = () => {
  const [query, setQuery] = useState();
  const [names, setNames] = useState({
    name: "",
    region: "",
    country: "",
  });
  const [temperature, setTemperature] = useState({
    temp_c: 0.0,
    condition: {
      text: "",
      icon: "//cdn.weatherapi.com/weather/64x64/day/143.png",
      code: 1030,
    },
    wind_kph: 0.0,
    humidity: 0,
    wind_dir: "E",
    cloud: 0,
  });
  const display = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };
  const updateQuery = async (req, res) => {
    try {
      const result = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=cee13b2f77244d8bb09181316232408&q=${query}&aqi=no`
      );
      const { location, current } = result.data;
      setNames({
        ...names,
        name: location.name,
        region: location.region,
        lat: location.lat,
      });
      setTemperature({
        ...temperature,
        temp_c: current.temp_c,
        condition: {
          text: current.condition.text,
          icon: current.condition.icon,
          code: current.condition.code,
        },
        wind_kph: current.wind_kph,
        humidity: current.humidity,
        wind_dir: current.wind_dir,
        cloud: current.cloud,
      });
      setQuery("");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    setQuery("");
  }, []);
  return (
    <>
      <h1>Welcome! to Weather App</h1>
      <div className="content">
        <div className="search-container">
          <input
            placeholder="Enter City Name"
            className="search-input"
            onChange={display}
            value={query}
            required
          />
          {query ? (
            <button onClick={updateQuery} className="btn-search">
              search
            </button>
          ) : (
            <button onClick={updateQuery} className="btn-search" disabled>
              search
            </button>
          )}
          <div className="transparent">
            <div className="temp-img">
              <img src={temperature.condition.icon} alt="temp-icon" />
            </div>

            <div className="temp-info">
              <h2>
                <span>Wheather type : </span>
                {temperature.condition.text}
              </h2>
              <h2>
                <span>City : </span>
                {names.name}
              </h2>
              <h2>
                <span>Temperature(in celcius) : </span>
                {temperature.temp_c}°C
              </h2>
            </div>
          </div>
          <div className="moreinfo">
            <div className="wind box">
              <h3>
                <span>WindSpeed</span>
              </h3>
              <h2>{temperature.wind_kph}kph</h2>
            </div>
            <div className="box">
              <h3>
                <span>Humidity</span>
              </h3>
              <h2>{temperature.humidity}</h2>
            </div>
            <div className="box">
              <h3>
                <span>Winddirection</span>
              </h3>
              <h2>{temperature.wind_dir}</h2>
            </div>
            <div className="box">
              <h3>
                <span>Cloudy chances</span>
              </h3>
              <h2>{temperature.cloud}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
