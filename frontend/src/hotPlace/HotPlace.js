import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './HotPlace.css';

const SEOUL_OPEN_DATA_AUTH_KEY_= "515653596b79756a38384a77506645" // 서울 열린 데이터

// 1부터 115까지 "POI001", "POI002", ..., "POI115" 형식의 리스트 생성
const AREA_CODES = Array.from({ length: 115 }, (_, index) => {
    const number = (index + 1).toString().padStart(3, '0'); // 3자리 숫자로 포맷
    return `POI${number}`;
  });
function HotPlaces() {
  const [hotPlaces, setHotPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // 모달 창이 열려있는지 여부를 관리하는 상태
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const fetchHotPlaces = async () => {
    // 결과를 저장할 배열을 초기화합니다.
    const results = [];
  
    // 각 장소에 대한 비동기적인 혼잡도 데이터를 가져옵니다.
    const fetchPromises = AREA_CODES.map(async (code) => {
      try {
        // const response = await fetch(`ㄴ${SEOUL_OPEN_DATA_AUTH_KEY_}/json/citydata_ppltn/1/5/${code}`);
        const response = await fetch(`/seoul-api/${SEOUL_OPEN_DATA_AUTH_KEY_}/json/citydata_ppltn/1/5/${code}`);

        const data = await response.json();
        // console.log(data)
        const personData = data['SeoulRtd.citydata_ppltn']['0']; // 안전하게 인덱스에 접근
        if (personData) {
          // 인구 최소 및 최대값을 숫자로 변환하여 평균을 계산합니다.
          const minPopulation = parseInt(personData.AREA_PPLTN_MIN, 10);
          const maxPopulation = parseInt(personData.AREA_PPLTN_MAX, 10);
          const avgPopulation = (minPopulation + maxPopulation) / 2;
  
          // 해당 핫플레이스의 데이터를 객체로 저장하여 결과 배열에 추가합니다.
          results.push({
            AREA_NM: personData.AREA_NM,
            AREA_CD: personData.AREA_CD,
            LIVE_PPLTN_STTS: avgPopulation,
            AREA_CONGEST_MSG: personData.AREA_CONGEST_MSG,
            AREA_PPLTN_MIN: minPopulation,
            AREA_PPLTN_MAX: maxPopulation,
          });
        }
      } catch (error) {
        console.error(`Error fetching data for ${code}:`, error);
      }
    });
  
    // 모든 비동기 요청이 완료될 때까지 기다립니다.
    await Promise.all(fetchPromises);
  
    // 혼잡도 기준으로 정렬하여 상위 5개의 핫플레이스만 추출합니다.
    const topHotPlaces = results
      .sort((a, b) => b.LIVE_PPLTN_STTS - a.LIVE_PPLTN_STTS)
      .slice(0, 5);
  
    // 상태 업데이트
    setHotPlaces(topHotPlaces);
  
  };

  useEffect(() => {
    fetchHotPlaces();
  }, []);
  const handleHotPlaceClick = async (placeName, index) => {
    console.log(placeName.AREA_NM)
    const name = placeName.AREA_NM
    // 예를 들어, API 응답 데이터를 모달 창에 표시하거나 다른 페이지로 이동할 수 있습니다.
    setSelectedPlace(name);
    // 새로운 페이지로 이동
    navigate(`/hotplaces/${name}/${parseInt(index, 10) + 1}`); // useHistory 대신 useNavigate 사용
    // try {
    //   const response = await fetch(`http://openapi.seoul.go.kr:8088/${SEOUL_OPEN_DATA_AUTH_KEY_}/json/citydata/1/5/${name}`);
    //   const data = await response.json();
    //   // 여기서 API 응답 데이터를 처리하고, 새로운 페이지로 이동하거나 팝업 창을 열 수 있습니다.
    //   console.log("API 응답:", data);
    //   console.log(data.CITYDATA)

    //   // 예를 들어, API 응답 데이터를 모달 창에 표시하거나 다른 페이지로 이동할 수 있습니다.
    //   setSelectedPlace(data.CITYDATA);
    //   setModalOpen(true); // 모달 창 열기
     
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };
  const closeModal = () => {
    setSelectedPlace(null);
    setModalOpen(false); // 모달 창 닫기
  };

  return (
    <div>
      <ul className="hot-places-list">
              {hotPlaces.map((place, index) => (
                <li key={place.AREA_CD} className="hot-place-item" onClick={() => handleHotPlaceClick(place, index)}>
                  <h3>Top {index + 1} {place.AREA_NM}</h3>
                  <p className='top_title'> 실시간 인구 현황 </p>
                  <p className='top_content'>{place.LIVE_PPLTN_STTS} 명</p>
                  <p className='top_title'> 장소 혼잡도 </p>
                  <p className='top_content'>{place.AREA_CONGEST_MSG}</p>
                  {/* <p className='top_title'> 최소 인구 </p>
                  <p className='top_content'>{place.AREA_PPLTN_MIN}</p>
                  <p className='top_title'> 최대 인구 </p>
                  <p className='top_content'>{place.AREA_PPLTN_MAX}</p> */}
                
                </li>
              ))}
              
      </ul>
    
    </div>
     
  );
}

export default HotPlaces;
