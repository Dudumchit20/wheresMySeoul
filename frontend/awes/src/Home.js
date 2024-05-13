// src/Home.js

import React, { useState } from 'react';
import Map from './search/Map.js';
import "./Home.css";
import LocationSearchField from "./recent_location/TextField";
import FilterButtons from "./recommend/FilterButtons";
import ReFilterButtons from "./search/ReFilterButtons";
import NumFilterButtons from "./recommend/NumFilterButtons";
import LanSelection from "./language/LanSelection";
import WeatherComponent from "./weather/weather";
import HotPlaces from './hotPlace/HotPlace';
import logo from './logo.png'; // 이미지를 올바르게 임포트

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);


  // const handleClick = () => {
  //   console.log("Button clicked!");
  // };

  return (
    <div className="app_container">
    <header className="header">
      <div className="app-header-left-content">
        <img className = "img_logo" src={logo} alt="로고 이미지"  />
        <h4>숨겨진 서울의 모습 찾아서, AI 기반 관광 추천 서비스</h4>
      </div>
      <div className="app-header-right-content">
       <LanSelection/>
      </div>
    </header>

    <div className="body-content">
      <div className="block">
            <LocationSearchField setWeatherData={setWeatherData}/>
      </div>
      <div className="item-container">
        <div className="double-item">
          <div className="block_weather">
            <h2>오늘의 관광날씨는?</h2>
            {weatherData && (
              <WeatherComponent
                temperature={weatherData.temperature}
                precipitation={weatherData.precipitation}
                humidity={weatherData.humidity}
                windSpeed={weatherData.windSpeed}
                mes_air={weatherData.mes_air}
                mes_uv={weatherData.mes_uv}
                mes_rain={weatherData.mes_rain}
              />
            )}
            
            <h5>관광 시 추천하는 준비물</h5>
            <div className="weather_container">
              <div className="icon_container">
                <div className="weather_icon">
                  <img src="/png/mask.png" alt="mask" /> 
                </div>
                <div className="icon_title"> 마스크</div>

              </div>
              <div className="icon_container">
                <div className="weather_icon">
                  <img src="/png/umbrella.png" alt="umbrella" /> 
                </div>
                <div className="icon_title"> 우산</div>

              </div>
            </div>
          
          </div>
          <div className="block_top">
          <h2>서울의 핫플 Top5</h2>
          <HotPlaces/>
          </div>    
        </div>
      
      
        <div className="block2">
          <h2>주변 관광지 찾아보기</h2>
          필터 (복수 선택 가능)
          <ReFilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          <Map selectedFilters={selectedFilters} />
        </div>
      </div>
      
      <div className="block">
      <h2>관광 코스 추천 받기</h2>
      장소의 갯수를 선택해주세요
      <NumFilterButtons/>
      원하는 분류를 선택해주세요 (복수선택 가능)
      <FilterButtons/>
      <div style={{ textAlign: "center" }}>
        <button className="recommand_button"> 추천 받기</button>
      </div>
      </div>
    </div>
    
    <footer className="footer">
      대표 이메일 : dudumchit2023@gmail.com <br></br>
      Copyright © 서로감자
    </footer>
    
    </div>
    
   
  );
}

export default App;
