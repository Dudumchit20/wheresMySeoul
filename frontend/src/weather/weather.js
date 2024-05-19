import React from 'react';
import "./weather.css";
// 번역
import { useTranslation } from "react-i18next";
const WeatherComponent = ({ temperature, precipitation, humidity, windSpeed, mes_rain, mes_uv, mes_air}) => {
  const { t } = useTranslation();

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
        <div className="mes_title"> {t('content2.subtitle1_weather')} <br/> </div>
        <div className="mes"> {mes_rain} <br/></div>
        <div className="mes_title">{t('content2.subtitle2_weather')}<br/> </div>
        <div className="mes">{mes_uv} <br/> </div>
        <div className="mes_title">{t('content2.subtitle3_weather')} <br/> </div>
        <div className="mes"> {mes_air} <br/> </div>
    </div>
    
  );
};

export default WeatherComponent;
