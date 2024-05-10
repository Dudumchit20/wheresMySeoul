import React from 'react';
import "./weather.css";

const WeatherComponent = ({ temperature, precipitation, humidity, windSpeed }) => {
  return (
    <div className="weather_container">
      <div className="weather">{temperature}°C</div>
      <div className="weather_sub">
        강수확률: {precipitation}% <br />
        습도: {humidity}% <br />
        풍속: {windSpeed}m/s <br />
      </div>
      <img src="/png/weather/sun.png" alt="sun" />
    </div>
  );
};

export default WeatherComponent;
