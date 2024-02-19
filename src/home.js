import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default function Home() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    // Detect user's location when component mounts
    detectUserLocation();
  }, []);

  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getWeatherByCoordinates = (latitude, longitude) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getWeatherByCityName = () => {
    if (!inputCity) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`;
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherByCityName();
  };

  return (
    <div className="col-md-12 wetherBg">
      <h1 className="heading"> Climate Forcast </h1>

      <div className="d-grid gap-3 col-4 mt-4">
        <input
          type="text"
          className="form-control"
          value={inputCity}
          onChange={handleChangeInput}
          placeholder="Enter location"
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center dataBg mt-5">
          <div className="shadow rounded wetherResultBox">
            <img
              className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="weather icon"
            />
            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }
    </div>
  );
}
