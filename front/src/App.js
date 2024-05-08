// src/App.js

import React from "react";
import "./App.css";
import Map from './Map';

function App() {
  // const handleClick = () => {
  //   console.log("Button clicked!");
  // };

  return (
    <div className="app_container">
    <header className="header">
      <div className="app-header-left-content">
        <h1>서울을 찾아서</h1>
        <h5>숨겨진 서울의 모습 찾아서, AI 기반 관광 추천 서비스</h5>
      </div>
      <div className="app-header-right-content">
        <button className="lang-button">한국어</button>
        <button className="lang-button">English</button>
        <button className="lang-button">中國語</button>
      </div>
    </header>

    <body className="body-content">
      <div className="block">

        <h2>현재 위치</h2>
        <h5>현재 위치 혹은 원하는 위치를 기반으로 서비스를 제공합니다.</h5>
        <button className="location_button">🥳 관광거리</button>

      </div>
      <div className="item-container">
        <div className="double-item">
          <div className="block_weather">
            <h2>오늘의 관광날씨는?</h2>
          </div>
          <div className="block_top">
          <h2>서울의 핫플 Top5</h2>
          </div>    
        </div>
      
      
        <div className="block2">
          <h2>주변 관광지 찾아보기</h2>
          필터
          <div className="filters">
            <button className="filter_button">🥳 관광거리</button>
            <button className="filter_button">🗽 명소</button>
            <button className="filter_button">🇰🇷 문화</button>
            <button className="filter_button">🛍️ 쇼핑</button>
            <button className="filter_button">🍀 자연</button>
            <button className="filter_button">🍱 음식</button>
            <button className="filter_button">외국인</button>
          </div>
          < Map/>
        </div>
      </div>
      
      <div className="block">
      <h2>관광 코스 추천 받기</h2>
      장소의 갯수를 선택해주세요
          <div className="filters">
            <button className="filter_button">1</button>
            <button className="filter_button">2</button>
            <button className="filter_button">3</button>
            <button className="filter_button">4</button>
            <button className="filter_button">5</button>
            <button className="filter_button">6</button>
            <button className="filter_button">7</button>
            <button className="filter_button">8</button>
            <button className="filter_button">9</button>
            <button className="filter_button">10개 이상</button>
          </div>
      원하는 분류를 선택해주세요 (복수선택 가능)
      <div className="filters">
        <button className="filter_button">🥳 관광거리</button>
        <button className="filter_button">🗽 명소</button>
        <button className="filter_button">🇰🇷 문화</button>
        <button className="filter_button">🛍️ 쇼핑</button>
        <button className="filter_button">🍀 자연</button>
        <button className="filter_button">🍱 음식</button>
        <button className="filter_button">외국인</button>
      </div >
      <div style={{ textAlign: "center" }}>
        <button className="recommand_button"> 추천 받기</button>
      </div>
      </div>
    </body>
    
    <footer className="footer">
      대표 이메일 : dudumchit2023@gmail.com <br></br>
      Copyright © 서로감자
    </footer>
    
    </div>
    
   
  );
}

export default App;
