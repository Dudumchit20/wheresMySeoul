// HotPlaceDetail.js

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, MarkerF } from '@react-google-maps/api'; // LoadScript 추가
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

// 번역
import { useTranslation } from "react-i18next";
function HotPlaceDetail() {
    const { t } = useTranslation();

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
    const [isLoading, setIsLoading] = useState(true);  // 로딩 상태를 관리하는 상태 변수

    const SEOUL_OPEN_DATA_AUTH_KEY= "515653596b79756a38384a77506645";
    const navigate = useNavigate();
     // 필터링된 값을 업데이트하는 함수
  const handleSelectedFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };
    useEffect(() => {
        // 페이지가 로드될 때 API 호출하여 해당 장소에 대한 데이터를 받아옴
        async function fetchPlaceData() {
            try {
                // const response = await fetch(`http://openapi.seoul.go.kr:8088/${SEOUL_OPEN_DATA_AUTH_KEY}/json/citydata/1/5/${placeName}`);

                const response = await fetch(`/seoul-api/${SEOUL_OPEN_DATA_AUTH_KEY}/json/citydata/1/5/${placeName}`);
                console.log("log---------",response)
                const data = await response.json();
                console.log("log---------",data)
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
                console.log("log2---------",subway,bike,parking,culture)

            } catch (error) {
                console.error('Error fetching place data:', error);
            }
        }
        fetchPlaceData().then(() => {
          setIsLoading(false);  // 데이터 로딩이 완료되면 isLoading을 false로 설정

        });
    }, [placeName]);
    // 홈 화면으로 돌아가는 함수
    const goBackToHome = () => {
        navigate('/');

    };
    return (
        <div className="app_container">
        <header className="header2">
          <div className="app-header-left-content">
            <h1>TOP {index}.  {placeName}</h1>
            {/* <h4>숨겨진 서울의 모습 찾아서, AI 기반 관광 추천 서비스</h4> */}
             {/* 받아온 데이터를 표시 */}
             <button class="home-button" onClick={goBackToHome}> {t('header2.home')}</button>
          </div>
          <div className="app-header-right-content">
           <LanSelection/>
          </div>
        </header>
    
        <div className="body-content">
        
          <div className="item-container">
              <div className="block_detail">
                <h2>{placeName} {t('content2.title1')}</h2>
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
              <h2>{placeName}  {t('content2.title2')} </h2>
              {peopleData && (
                    <>              
                        <div className="mes_title"> {t('content2.subtitle1_people')} <br/> </div>
                        <div className="mes"> {peopleData.AREA_CONGEST_LVL} <br/></div>
                        <div className="mes_title"> {t('content2.subtitle2_people')} <br/> </div>
                        <div className="mes">{peopleData.AREA_CONGEST_MSG} <br/> </div>
                        <div className="mes_title">{t('content2.subtitle3_people')} <br/> </div>
                        <div className="mes">{peopleData.RESNT_PPLTN_RATE}% <br/> </div>
                        <div className="mes_title"> {t('content2.subtitle4_people')} <br/> </div>
                        <div className="mes">{peopleData.NON_RESNT_PPLTN_RATE}% <br/> </div>
                    </>
                )}
              
            </div>  
          
            <div className="block_detail2">
              <h2>{placeName}  {t('content2.title3')}</h2>
              <div className="mes_title"> {t('content2.subtitle1_road')} <br/> </div>
                <div className="mes"> {idx} <br/></div>
                <div className="mes_title">{t('content2.subtitle2_road')} <br/> </div>
                <div className="mes">{msg} <br/> </div>
                <div className="mes_title">{t('content2.subtitle3_road')} <br/> </div>
                <div className="mes"> {spd} km/h <br/> </div>
            </div>
          </div>
          
          <div className="block">
          <h2>{placeName} {t('content2.title4')}</h2>
          <div className="title_inf">{t('content2.subtitle1_traffic')}!</div>
          {t('content2.subtitle2_traffic')}
              <ReFilterButtons selectedFilters={selectedFilters} setSelectedFilters={handleSelectedFiltersChange} />
              {isLoading ? (
                <div> Loading... 잠시만 기다려주세요.</div>  // 데이터 로딩 중 로딩 인디케이터 표시
              ) : (
                <div>
                   <Map  placeName = {placeName} inf1={culture} inf2={parking} inf3={subway} inf4={bike} selectedFilters = {selectedFilters}/>
                </div>  // 데이터 로딩 완료 후 컨텐츠 표시
              )}
               

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