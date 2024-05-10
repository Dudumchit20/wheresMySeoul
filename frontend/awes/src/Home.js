// src/Home.js

import React from "react";
 import Map from './Map';
import "./Home.css";
import TextField from "./TextField";
import FilterButtons from "./FilterButtons";
import ReFilterButtons from "./ReFilterButtons";
import NumFilterButtons from "./NumFilterButtons";
import LanSelection from "./LanSelection";
import WeatherComponent from "./weather/weather";

function App() {
  // const handleClick = () => {
  //   console.log("Button clicked!");
  // };

  return (
    <div className="app_container">
    <header className="header">
      <div className="app-header-left-content">
        <h1>서울을 찾아서</h1>
        <h4>숨겨진 서울의 모습 찾아서, AI 기반 관광 추천 서비스</h4>
      </div>
      <div className="app-header-right-content">
       <LanSelection/>
      </div>
    </header>

    <div className="body-content">
      <div className="block">
        <div className="weather_container">
          <div className="container_row_left">
            <h2>현재 위치</h2> 
            <h5>현재 위치 혹은 원하는 위치를 기반으로 서비스를 제공합니다.</h5>
          </div>
            <TextField/>
        </div>
       

      </div>
      <div className="item-container">
        <div className="double-item">
          <div className="block_weather">
            <h2>오늘의 관광날씨는?</h2>
            <WeatherComponent/>
            
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
          </div>    
        </div>
      
      
        <div className="block2">
          <h2>주변 관광지 찾아보기</h2>
          필터 (복수 선택 가능)
          <ReFilterButtons/>  
          < Map/>
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
