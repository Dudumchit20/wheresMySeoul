// RecommendDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import "../Home.css"
import "../weather/weather.css"
import "../hotPlace/HotPlace.css"
import "./RecommendDetail.css"
import Map  from './Map.js';
import LanSelection from "../language/LanSelection";

function RecommendDetail(  ) {
    const { placeNum, filters, currentLocation } = useParams();
    const navigate = useNavigate();

    const [allData, setAllData] = useState({});
    let filterColor = {
        "관광거리": "845cfd",
        "명소": "e256a3",
        "문화": "fdf25e",
        "쇼핑": "5e86fd",
        "자연": "00e244",
        "음식": "ff8c00",
        "외국인": "fd695c",
    };

    // Translation dictionary to map filters to DB fields
    let filterTrans = {
        "관광거리": "tourStreetKor",
        "명소": "attractions",
        "문화": "entertainment",
        "쇼핑": "shoppings",
        "자연": "nature",
        "음식": "restaurants",
        "외국인": "tourInformations",
    };

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const categories = filters.split(',').map(filter => filterTrans[filter]).join(',');
            console.log(currentLocation, placeNum, filters)
            const response = await fetch(`/awes-api/recommend?latitude=37.659223&longitude=127.050265&num=${placeNum}&category=${filters}`);
            // const response = await fetch(`http://3.39.223.21:8080/recommend?latitude=37.659223&longitude=127.050265&num=${placeNum}&category=${filters}`);
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllData(data);
            console.log(data);


            
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    useEffect(() => {
        console.log(allData);
      }, [allData]);
      
    useEffect(() => {
        fetchData();
    }, [placeNum, filters]);

    const goBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="app_container">
            <header className="header">
                <div className="app-header-left-content">
                    <h1>관광 코스 추천</h1>
                    <button className="home-button" onClick={goBackToHome}>홈 화면으로 돌아가기</button>
                </div>
                <div className="app-header-right-content">
                    <LanSelection />
                </div>
            </header>
            <div className="body-content">
                <div className="container-row">

                    {filters.split(',').map((filter, index) => {
                        const key = filterTrans[filter];
                        return (
                            <div className="block3" key={index}>
                                <h2 style={{ color: `#${filterColor[filter]}` }}>{filter}</h2>
                                {allData[key] && allData[key].length > 0 ? (
                                    <ul className="hot-places-list">
                                        {allData[key].map((item, itemIndex) => (
                                            <li key={item.id} className="hot-place-item">
                                                <h3 >{item.name}</h3>
                                                <p className='top_title'> 주소 </p>
                                                <p className='top_content'>{item.address || item.old_address}</p>
                                                <p className='top_title'> 운영 시간 </p>
                                                <p className='top_content'>{item.operatingHours}</p>
                                                <p className='top_title'> 전화번호 </p>
                                                <p className='top_content'>{item.phoneNumber}</p>
                                                {key == "명소" && (
                                                     <>
                                                     <p className='top_title'> 명소인경우 </p>
                                                     <p className='top_content'><a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></p>
                                                    </>
                                                )}
                                                {item.website && (
                                                    <>
                                                        <p className='top_title'> 웹사이트 </p>
                                                        <p className='top_content'><a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></p>
                                                    </>
                                                )}
                                                {item.traffic_info && (
                                                    <>
                                                        <p className='top_title'> 교통 정보 </p>
                                                        <p className='top_content'>{item.traffic_info}</p>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No data available for {filter}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="block3">
                    <h2>어서울이 추천하는 관광코스!</h2> 
                    <div className='detail'>마커를 클릭하면 더 상세한 정보를 볼 수 있어요.     </div>              
                    <Map allData = {allData}  allselectedFilters={filters} gu = {currentLocation} currentLat={37.659223} currentLng={127.050265}/>
                </div>
               
            </div>
            <footer className="footer">
                대표 이메일 : dudumchit2023@gmail.com <br />
                Copyright © 서로감자
            </footer>
        </div>
    );
}

export default RecommendDetail;
