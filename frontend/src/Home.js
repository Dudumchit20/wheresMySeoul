// src/Home.js

import React, { useState, useEffect } from 'react';
import Map from './search/Map.js';
import { useNavigate } from 'react-router-dom';
import "./App.css";
import "./Home.css";

import LocationSearchField from "./recent_location/TextField";
import FilterButtons from "./recommend/FilterButtons";
import ReFilterButtons from "./search/ReFilterButtons";
import NumFilterButtons from "./recommend/NumFilterButtons";
import LanSelection from "./language/LanSelection";
import WeatherComponent from "./weather/weather";
import HotPlaces from './hotPlace/HotPlace';
import logo from './logo.png'; // 이미지를 올바르게 임포트

// 번역
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  // const languageRef = useRef<null | HTMLDivElement>(null);

  const [currentLocation, setCurrentLocation] = useState({});

  const [weatherData, setWeatherData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]); 


  const [selectedRecommendFilters, setSelectedRecommendFilters] = useState([]); 
  const [placeNum, setPlaceNum] = useState(null); 

  const [gu, setGu] = useState(null); 
  const [lat, setLat] = useState(null); 
  const [lng, setLng] = useState(null); 

  const navigate = useNavigate();

  const isButtonEnabled = placeNum !== null && selectedRecommendFilters.length > 0;

  useEffect(() => {
    console.log("Current location updated:", currentLocation, currentLocation.gu, currentLocation.lat, currentLocation.lng);
    setGu(currentLocation.gu); // 구 정보 설정
    setLat(currentLocation.lat); // 위도 설정
    setLng(currentLocation.lng); // 경도 설정
}, [currentLocation]); // currentLocation이 변경될 때마다 실행

  


  const RecommnedBtnClick = async (placeNum, filters) => {
    console.log("Parsed placeNum:", parseInt(placeNum));
    console.log("Incremented placeNum:", parseInt(placeNum) + 1);
    console.log("선택한 분류 확인", parseInt(placeNum) + 1, filters);
    
    // 새로운 페이지로 이동
    navigate(`/recommend/${gu}/${lat}/${lng}/${parseInt(placeNum) + 1}/${filters}`);
    
  }

  return (
    <div style={{ fontFamily: 'NanumBarunGothic' }}>
    <div className="app_container">
    <header className="header">
      <div className="app-header-left-content">
        <img className = "img_logo" src={logo} alt="로고 이미지"  />
        <h4>{t('header.subtitle')}</h4>
      </div>
      <div className="app-header-right-content">
       <LanSelection />
      </div>
      
    </header>

    <div className="body-content">
    <div className='ex'>{t('header.explain')}</div>
      <div className="block">
            <LocationSearchField setWeatherData={setWeatherData} setCurrentLocation = {setCurrentLocation} t = {t}/>
      </div>
      <div className="item-container">
        <div className="double-item">
          <div className="block_weather">
            <h2>{t('content.title2')}</h2>
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
          <h2>{t('content.title3')}</h2>
          <div className='content'>{t('content.subtitle3')}</div>
          <HotPlaces/>
          </div>    
        </div>
      
      
        <div className="block2">
          <h2>{t('content.title4')}</h2>
          <div className='content'> {t('content.subtitle4')}</div>
          <ReFilterButtons selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          <Map selectedFilters={selectedFilters} gu = {gu} currentLat={lat} currentLng={lng} />
        </div>
      </div>
      
      <div className="block">
      <h2>{t('content.title5')}</h2>
      <div className='content'> {t('content.subtitle5')} <br/> </div>
      <br></br>
      {t('content.sel1')}      
      <NumFilterButtons placeNum={placeNum} setPlaceNum = {setPlaceNum} />
      {t('content.sel2')}      
      <FilterButtons selectedRecommendFilters = {selectedRecommendFilters} setSelectedRecommendFilters = {setSelectedRecommendFilters}/>
      <div style={{ textAlign: "center" }}>
      </div>

        <button
          className={isButtonEnabled ? "recommand_button_selected" : "recommand_button"}
          onClick={() => RecommnedBtnClick(placeNum, selectedRecommendFilters)}
          disabled={!isButtonEnabled}
        >
          <div className='font'> {t('content.recommendBtn')}</div>
        </button>
      </div>
    </div>
    
    <footer className="footer">
      대표 이메일 : dudumchit2023@gmail.com <br></br>
      Copyright © 서로감자
    </footer>
    
    </div>
    
    </div>
  );
}

export default App;
