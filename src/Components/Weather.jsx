import React, { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: '/Images/cloud.png'
  });



  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if(name !== "") {
      const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cbbca7105e49d1330a0f861391707b61&units=metric`;
    axios
      .get(apiUrl)
      .then((res) => {
        let imagePath = '';
        if(res.data.weather[0].main === "Clouds") {
          imagePath = "/Images/cloud.png"
        } else if(res.data.weather[0].main === "Clear"){
          imagePath = "/Images/sun.png"
        } else if(res.data.weather[0].main === "Rain") {
          imagePath = "/Images/rain.jpeg"
        } else if(res.data.weather[0].main === "Drizzle") {
          imagePath = "/Images/drizzle.jpg"
        } else if(res.data.weather[0].main === "Mist") {
          imagePath = "/Images/snow.jpg"
        } else {
          imagePath = "/Images/cloud.png"
        }
        console.log(res.data)

        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath
        });

        setError('')
      })
      .catch((err) => {
        if(err.response.status === 404) {
          setError("Invalid City Name")
        } else {
          setError('')
        }
        console.log(err)
      });
    }
  }

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" onChange={e=> setName(e.target.value)} />
        <img src="/Images/search.jpg" alt="" onClick={handleClick} />
      </div>

      <div className="error">
        <p>{error}</p>
      </div>

      <div className="img-container">
        <img src={data.image} alt="" className="weather-icon" />
      </div>

      <p className="temperature">{Math.round(data.celcius)}°c</p>
      <p className="location">{data.name}</p>

      <div className="weather-data">
        <div className="col">
          <img src="/Images/humidity.jpg" alt="" />
          <div>
            <p>{Math.round(data.humidity)} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src="/Images/wind.png" alt="" />
          <div>
            <p> {Math.round(data.speed)} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
