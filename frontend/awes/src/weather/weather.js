import React from 'react';
import "./weather.css";

const WeatherComponent = ({ temperature, precipitation, humidity, windSpeed, mes_rain, mes_uv, mes_air}) => {
  return (
    <div>
        <div className="weather_container">
            <div className="weather">{temperature} °C </div>
            <div className="weather_sub">
                강수량 : {precipitation} mm <br />
                습도: {humidity} % <br />
                풍속: {windSpeed} m/s <br />
            </div>
            <img src="/png/weather/sun.png" alt="sun" />
        </div>
        <div className="mes_title"> 강수 관련 메세지 <br/> </div>
        <div className="mes"> {mes_rain} <br/></div>
        <div className="mes_title">자외선 메세지 <br/> </div>
        <div className="mes">{mes_uv} <br/> </div>
        <div className="mes_title">대기 관련 메세지 <br/> </div>
        <div className="mes"> {mes_air} <br/> </div>
    </div>
    
  );
};

export default WeatherComponent;
