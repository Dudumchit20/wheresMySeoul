// HotPlaceDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "../Home.css"
import "../weather/weather.css"
import "./HotPlaceDetail.css"

import Map from './Map.js';
import LocationSearchField from "../recent_location/TextField";
import FilterButtons from "../recommend/FilterButtons";
import ReFilterButtons from "./ReFilterButtons.js";
import LanSelection from "../language/LanSelection";
import WeatherComponent from "../weather/weather";
import HotPlaces from '../hotPlace/HotPlace';

function HotPlaceDetail() {
    const [weatherData, setWeatherData] = useState(null);
    const [idx, setIdx] = useState(null);
    const [msg, setMsg] = useState(null);
    const [spd, setSpd] = useState(null);

    const [information, setInformation] = useState(null);
    const [culture, setCulture] = useState(null);
    const [parking, setParking] = useState(null);
    const [subway, setSubway] = useState(null);
    const [bike, setBike] = useState(null);
    const [peopleData, setPeopleData] = useState(null);


    const [selectedFilters, setSelectedFilters] = useState([]);
    const { placeName } = useParams();
    const { index } = useParams();

    const [placeData, setPlaceData] = useState(null);
    const SEOUL_OPEN_DATA_AUTH_KEY_ = "515653596b79756a38384a77506645";
    const navigate = useNavigate();
     // 필터링된 값을 업데이트하는 함수
  const handleSelectedFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };
    useEffect(() => {
        // 페이지가 로드될 때 API 호출하여 해당 장소에 대한 데이터를 받아옴
        async function fetchPlaceData() {
            try {
                const response = await fetch(`http://openapi.seoul.go.kr:8088/${SEOUL_OPEN_DATA_AUTH_KEY_}/json/citydata/1/5/${placeName}`);
                const data = await response.json();
                
                // CITYDATA 객체 안에 있는 AREA_NM 속성 가져오기
                const weather = data.CITYDATA.WEATHER_STTS[0];
                const traffic = data.CITYDATA.ROAD_TRAFFIC_STTS.AVG_ROAD_DATA;
                const people = data.CITYDATA.LIVE_PPLTN_STTS[0];
                console.log(people);
                setPeopleData(people);

                const idx = traffic.ROAD_TRAFFIC_IDX
                const msg = traffic.ROAD_MSG
                const spd = traffic.ROAD_TRAFFIC_SPD

                const inf = data.CITYDATA
                const culture = inf.EVENT_STTS
                const bike = inf.SBIKE_STTS
                const parking = inf.PRK_STTS
                const subway = inf.SUB_STTS

                setWeatherData(weather)
                setIdx(idx)
                setMsg(msg)
                setSpd(spd)
                setInformation(inf)
                setCulture(culture)
                setBike(bike)
                setParking(parking)
                setSubway(subway)

            } catch (error) {
                console.error('Error fetching place data:', error);
            }
        }
        fetchPlaceData();
    }, [placeName]);
    // 홈 화면으로 돌아가는 함수
    const goBackToHome = () => {
        navigate('/');

    };
    return (
        <div className="app_container">
        <header className="header">
          <div className="app-header-left-content">
            <h1>TOP {index}.  {placeName}</h1>
            {/* <h4>숨겨진 서울의 모습 찾아서, AI 기반 관광 추천 서비스</h4> */}
             {/* 받아온 데이터를 표시 */}
             <button class="home-button" onClick={goBackToHome}> 홈 화면으로 돌아가기</button>
          </div>
          <div className="app-header-right-content">
           <LanSelection/>
          </div>
        </header>
    
        <div className="body-content">
        
          <div className="item-container">
              <div className="block_detail">
                <h2>{placeName} 의 날씨</h2>
                {weatherData && (
                  <WeatherComponent
                    temperature={weatherData.TEMP}
                    precipitation={weatherData.PRECIPITATION}
                    humidity={weatherData.HUMIDITY}
                    windSpeed={weatherData.WIND_SPD}
                    mes_air={weatherData.AIR_MSG}
                    mes_uv={weatherData.UV_MSG}
                    mes_rain={weatherData.PCP_MSG}
                  />
                )}
                
                
                
            </div>
            <div className="block_detail">
              <h2>{placeName} 의 인구비율 </h2>
              {peopleData && (
                    <>              
                        <div className="mes_title"> 지역 혼잡도 <br/> </div>
                        <div className="mes"> {peopleData.AREA_CONGEST_LVL} <br/></div>
                        <div className="mes_title"> 혼잡도 관련 메세지 <br/> </div>
                        <div className="mes">{peopleData.AREA_CONGEST_MSG} <br/> </div>
                        <div className="mes_title"> 거주자의 인구 비율 <br/> </div>
                        <div className="mes">{peopleData.RESNT_PPLTN_RATE}% <br/> </div>
                        <div className="mes_title"> 비거주자 (관광객 등)의 인구 비율 <br/> </div>
                        <div className="mes">{peopleData.NON_RESNT_PPLTN_RATE}% <br/> </div>
                    </>
                )}
              
            </div>  
          
            <div className="block_detail2">
              <h2>{placeName} 의 도로 상황</h2>
              <div className="mes_title"> 도로 혼잡도 <br/> </div>
                <div className="mes"> {idx} <br/></div>
                <div className="mes_title"> 도로 관련 메세지 <br/> </div>
                <div className="mes">{msg} <br/> </div>
                <div className="mes_title">도로 평균 속도 <br/> </div>
                <div className="mes"> {spd} km/h <br/> </div>
            </div>
          </div>
          
          <div className="block">
          <h2>{placeName} 의 교통상황</h2>
          <div className="title_inf">** 마커를 클릭하면 더 상세한 정보를 얻으실 수 있습니다!</div>
              필터 (복수 선택 가능)
              <ReFilterButtons selectedFilters={selectedFilters} setSelectedFilters={handleSelectedFiltersChange} />
                <Map  placeName = {placeName} inf1={culture} inf2={parking} inf3={subway} inf4={bike} selectedFilters = {selectedFilters}/>

          </div>
        </div>
        
        <footer className="footer">
          대표 이메일 : dudumchit2023@gmail.com <br></br>
          Copyright © 서로감자
        </footer>
        
        </div>
        
       
      );

}

export default HotPlaceDetail;