// Map.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, MarkerF } from '@react-google-maps/api'; // LoadScript 추가
import "./Map.css";

const touristSpots = [
  { name: "강남 MICE 관광특구", latitude: 37.5103975, longitude: 127.0611934 },
  { name: "동대문 관광특구", latitude: 37.5652887, longitude: 127.0034837 },
  { name: "명동 관광특구", latitude: 37.5633245, longitude: 126.9872338 },
  { name: "이태원 관광특구", latitude: 37.5343897, longitude: 126.9958273 },
  { name: "잠실 관광특구", latitude: 37.51411, longitude: 127.1072493 },
  { name: "종로·청계 관광특구", latitude: 37.56910653, longitude: 126.9786608 },
  { name: "홍대 관광특구", latitude: 37.5558499, longitude: 126.9241498 },
  { name: "경복궁", latitude: 37.579617, longitude: 126.977041 },
  { name: "광화문·덕수궁", latitude: 37.5758772, longitude: 126.9768121 },
  { name: "보신각", latitude: 37.5697599, longitude: 126.9836604 },
  { name: "서울 암사동 유적", latitude: 37.5601719, longitude: 127.1298794 },
  { name: "창덕궁·종묘", latitude: 37.5794309, longitude: 126.9910426 },
  { name: "가산디지털단지역", latitude: 37.48089, longitude: 126.8825735 },
  { name: "강남역", latitude: 37.497952, longitude: 127.027619 },
  { name: "건대입구역", latitude: 37.540372, longitude: 127.069276 },
  { name: "고덕역", latitude: 37.555051, longitude: 127.15411 },
  { name: "고속터미널역", latitude: 37.5060545, longitude: 127.0054926 },
  { name: "교대역", latitude: 37.4934705, longitude: 127.0142285 },
  { name: "구로디지털단지역", latitude: 37.485215, longitude: 126.901594 },
  { name: "구로역", latitude: 37.5031784, longitude: 126.8820367 },
  { name: "군자역", latitude: 37.5573355, longitude: 127.079589 },
  { name: "남구로역", latitude: 37.486087, longitude: 126.887272 },
  { name: "대림역", latitude: 37.4925043, longitude: 126.8949615 },
  { name: "동대문역", latitude: 37.571731, longitude: 127.011069 },
  { name: "뚝섬역", latitude: 37.547206, longitude: 127.047405 },
  { name: "미아사거리역", latitude: 37.613251, longitude: 127.030084 },
  { name: "발산역", latitude: 37.558683, longitude: 126.837595 },
  { name: "북한산우이역", latitude: 37.662909, longitude: 127.012798 },
  { name: "사당역", latitude: 37.476559, longitude: 126.981633 },
  { name: "삼각지역", latitude: 37.5350315, longitude: 126.9734515 },
  { name: "서울대입구역", latitude: 37.48121, longitude: 126.952712 },
  { name: "서울식물원·마곡나루역", latitude: 37.5669356, longitude: 126.8265611 },
  { name: "서울역", latitude: 37.555946, longitude: 126.972317 },
  { name: "선릉역", latitude: 37.504487, longitude: 127.048957 },
  { name: "성신여대입구역", latitude: 37.59272, longitude: 127.016544 },
  { name: "수유역", latitude: 37.6371095, longitude: 127.0247325 },
  { name: "신논현역·논현역", latitude: 37.504724, longitude: 127.02538 },
  { name: "신도림역", latitude: 37.5088099, longitude: 126.8912061 },
  { name: "신림역", latitude: 37.4631968, longitude: 126.9358124 },
  { name: "신촌·이대역", latitude: 37.556761, longitude: 126.945857 },
  { name: "양재역", latitude: 37.484102, longitude: 127.034369 },
  { name: "역삼역", latitude: 37.5000776, longitude: 127.0385419 },
  { name: "연신내역", latitude: 37.618812, longitude: 126.920842 },
  { name: "오목교역·목동운동장", latitude: 37.524553, longitude: 126.87505 },
  { name: "왕십리역", latitude: 37.561949, longitude: 127.038485 },
  { name: "용산역", latitude: 37.5298837, longitude: 126.9648019 },
  { name: "이태원역", latitude: 37.534542, longitude: 126.994596 },
  { name: "장지역", latitude: 37.477699, longitude: 127.126274 },
  { name: "장한평역", latitude: 37.561472, longitude: 127.064657 },
  { name: "천호역", latitude: 37.5443765, longitude: 127.1276202 },
  { name: "총신대입구(이수)역", latitude: 37.486803, longitude: 126.982193 },
  { name: "충정로역", latitude: 37.560055, longitude: 126.963672 },
  { name: "합정역", latitude: 37.5495753, longitude: 126.9139908 },
  { name: "혜화역", latitude: 37.5878109, longitude: 127.0017424 },
  { name: "홍대입구역(2호선)", latitude: 37.557527, longitude: 126.9244669 },
  { name: "회기역", latitude: 37.589756, longitude: 127.057977 },
  { name: "4·19 카페거리", latitude: 37.6469633, longitude: 127.0091314 },
  { name: "가락시장", latitude: 37.4933411, longitude: 127.1097998 },
  { name: "가로수길", latitude: 37.5210566, longitude: 127.0228686 },
  { name: "광장(전통)시장", latitude: 37.5700398, longitude: 126.9996036 },
  { name: "김포공항", latitude: 37.5655383, longitude: 126.8013282 },
  { name: "낙산공원·이화마을", latitude: 37.5779788, longitude: 127.0071915 },
  { name: "노량진", latitude: 37.514082, longitude: 126.941687 },
  { name: "덕수궁길·정동길", latitude: 37.5662233, longitude: 126.9745734 },
  { name: "방배역 먹자골목", latitude: 37.4819523, longitude: 126.9971117 },
  { name: "북촌한옥마을", latitude: 37.5814696, longitude: 126.9849519 },
  { name: "서촌", latitude: 37.5786164, longitude: 126.9683862 },
  { name: "성수카페거리", latitude: 37.5429545, longitude: 127.0565597 },
  { name: "수유리 먹자골목", latitude: 37.6401151, longitude: 127.026718 },
  { name: "쌍문동 맛집거리", latitude: 37.6533557, longitude: 127.0271003 },
  { name: "압구정로데오거리", latitude: 37.5267755, longitude: 127.0389294 },
  { name: "여의도", latitude: 37.5295808, longitude: 126.9326803 },
  { name: "연남동", latitude: 37.5627439, longitude: 126.9214088 },
  { name: "영등포 타임스퀘어", latitude: 37.5170751, longitude: 126.9033411 },
  { name: "외대앞", latitude: 37.595518, longitude: 127.059615 },
  { name: "용리단길", latitude: 37.5313985, longitude: 126.9721602 },
  { name: "이태원 앤틱가구거리", latitude: 37.5316779, longitude: 126.9948943 },
  { name: "인사동·익선동", latitude: 37.5717174, longitude: 126.9860732 },
  { name: "창동 신경제 중심지", latitude: 37.6477423, longitude: 127.044059 },
  { name: "청담동 명품거리", latitude: 37.5260965, longitude: 127.0451308 },
  { name: "청량리 제기동 일대 전통시장", latitude: 37.5837593, longitude: 127.0372351 },
  { name: "해방촌·경리단길", latitude: 37.538432, longitude: 126.9875466 },
  { name: "DDP(동대문디자인플라자)", latitude: 37.5665256, longitude: 127.0092236 },
  { name: "DMC(디지털미디어시티)", latitude: 37.5777446, longitude: 126.8921565 },
  { name: "강서한강공원", latitude: 37.5880848, longitude: 126.8152348 },
  { name: "고척돔", latitude: 37.498182, longitude: 126.8670082 },
  { name: "광나루한강공원", latitude: 37.5487859, longitude: 127.1200384 },
  { name: "광화문광장", latitude: 37.572389, longitude: 126.9769117 },
  { name: "국립중앙박물관·용산가족공원", latitude: 37.5238506, longitude: 126.9804702 },
  { name: "난지한강공원", latitude: 37.5660148, longitude: 126.8765181 },
  { name: "남산공원", latitude: 37.5509895, longitude: 126.9908991 },
  { name: "노들섬", latitude: 37.5177627, longitude: 126.9596671 },
  { name: "뚝섬한강공원", latitude: 37.5293507, longitude: 127.0699562 },
  { name: "망원한강공원", latitude: 37.5553605, longitude: 126.8949135 },
  { name: "반포한강공원", latitude: 37.5106226, longitude: 126.9959627 },
  { name: "북서울꿈의숲", latitude: 37.6214313, longitude: 126.9230282 },
  { name: "불광천", latitude: 37.599557, longitude: 126.9157093 },
  { name: "서리풀공원·몽마르뜨공원", latitude: 37.4950995, longitude: 127.0035246 },
  { name: "서울광장", latitude: 37.5655675, longitude: 126.978014 },
  { name: "서울대공원", latitude: 37.4275247, longitude: 127.0170252 },
  { name: "서울숲공원", latitude: 37.5443878, longitude: 127.0374424 },
  { name: "아차산", latitude: 37.5715087, longitude: 127.1037627 },
  { name: "양화한강공원", latitude: 37.5383005, longitude: 126.902265 },
  { name: "어린이대공원", latitude: 37.549363, longitude: 127.0818126 },
  { name: "여의도한강공원", latitude: 37.5267106, longitude: 126.9347112 },
  { name: "월드컵공원", latitude: 37.5638735, longitude: 126.8935007 },
  { name: "응봉산", latitude: 37.5481769, longitude: 127.0298261 },
  { name: "이촌한강공원", latitude: 37.5169202, longitude: 126.9717022 },
  { name: "잠실종합운동장", latitude: 37.5153013, longitude: 127.0728076 },
  { name: "잠실한강공원", latitude: 37.5175896, longitude: 127.0867236 },
  { name: "잠원한강공원", latitude: 37.5206865, longitude: 127.0122724 },
  { name: "청계산", latitude: 37.4141657, longitude: 127.0415787 },
  { name: "청와대", latitude: 37.5866076, longitude: 126.974811 },
  { name: "북창동 먹자골목", latitude: 37.5624528, longitude: 126.978205 },
  { name: "남대문시장", latitude: 37.5591786, longitude: 126.9776692 }
];


const containerStyle = {
  width:'100%',
  height: '100%',
  minHeight:"500px"
};

const defaultCenter = {
  lat: 37.5665,
  lng: 126.9780
};

const markerIcons = {
  "자전거": "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  "주차장": "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "문화": "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "지하철": "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
};
const integrateData = (inf1, inf2, inf3, inf4, selectedFilters) => {
  const filteredMarkers = [];

  // 선택된 필터에 따라 마커 필터링
  // 문화 정보 처리
  if (selectedFilters.includes("문화")) {
    inf1.forEach((event) => {
      const { EVENT_X, EVENT_Y, EVENT_NM, EVENT_PLACE, EVENT_PERIOD, URL, THUMBNAIL } = event;
      filteredMarkers.push({
        lat: parseFloat(EVENT_Y),
        lng: parseFloat(EVENT_X),
        type: "문화",
        detail: {
          name: EVENT_NM,
          place: EVENT_PLACE,
          period: EVENT_PERIOD,
          url: URL,
          thumbnail: THUMBNAIL
        }
      });
    });
  }

  // 주차장 정보 처리
  if (selectedFilters.includes("주차장")) {
    inf2.forEach((parking) => {
      const { LAT, LNG, PRK_NM, ADDRESS, RATES, PAY_YN } = parking;
      filteredMarkers.push({
        lat: parseFloat(LAT),
        lng: parseFloat(LNG),
        type: "주차장",
        detail: {
          name: PRK_NM,
          address: ADDRESS,
          rates: RATES,
          pay: PAY_YN
        }
      });
    });
  }

  // 지하철 정보 처리
  if (selectedFilters.includes("지하철")) {
    inf3.forEach((subway) => {
      const { SUB_STN_X, SUB_STN_Y, SUB_STN_NM, SUB_STN_LINE, SUB_STN_RADDR, SUB_STN_JIBUN } = subway;
      filteredMarkers.push({
        lat: parseFloat(SUB_STN_Y),
        lng: parseFloat(SUB_STN_X),
        type: "지하철",
        detail: {
          name: SUB_STN_NM,
          line: SUB_STN_LINE,
          address: SUB_STN_RADDR,
          jibun: SUB_STN_JIBUN
        }
      });
    });
  }

  // 자전거 정보 처리
  if (selectedFilters.includes("자전거")) {
    inf4.forEach((bike) => {
      const { SBIKE_X, SBIKE_Y, SBIKE_SPOT_NM, SBIKE_SHARED, SBIKE_PARKING_CNT } = bike;
      filteredMarkers.push({
        lat: parseFloat(SBIKE_Y),
        lng: parseFloat(SBIKE_X),
        type: "자전거",
        detail: {
          name: SBIKE_SPOT_NM,
          shared: SBIKE_SHARED,
          parkingCnt: SBIKE_PARKING_CNT
        }
      });
    });
  }

  return filteredMarkers;
};
const Map = ({ placeName, inf1, inf2, inf3, inf4, selectedFilters }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로드 여부 상태 변수 추가
  const [placeNameData, setPlaceNameData ] = useState([]);
  const isPlaceInTouristSpots = touristSpots.some(spot => spot.name === placeName);
  
  
  useEffect(() => {
    const place = touristSpots.find(spot => spot.name === placeName);
    console.log(place)

    if (place) {
      setCurrentPosition({
        lat: place.latitude,
        lng: place.longitude
        
      });
      console.log(currentPosition)

    }
  }, [placeName]);  // placeName이 변경될 때만 실행
  
  useEffect(() => {
    // inf1, inf2, inf3, inf4 정보가 모두 유효하고 selectedFilters가 있는 경우에만 처리
    if (inf1 && inf2 && inf3 && inf4 && selectedFilters) {
      setIsDataLoaded(true); // 데이터 로드됨을 표시
    }
  }, [inf1, inf2, inf3, inf4, selectedFilters]);
  
  // 위치 데이터 및 필요한 데이터가 로드된 후에 마커 설정
  useEffect(() => {
    if (isDataLoaded) {
      const filteredMarkers = integrateData(inf1, inf2, inf3, inf4, selectedFilters);
      setMarkers(filteredMarkers);
    }
  }, [isDataLoaded]);


  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div className='parent-container'>
      <div className="box_map">
              {/* 조건문을 사용하여 API가 로드되지 않은 경우에만 LoadScript 컴포넌트를 렌더링 */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={13}
        >
          {/* 현재 위치 마커 */}
          {isPlaceInTouristSpots && (
            <MarkerF position={currentPosition} title="현재 위치" />
          )}

          {/* 응답 데이터 마커 */}
          {markers.map((marker, index) => (
            <MarkerF
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={markerIcons[marker.type] || "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
              title={marker.detail.name}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
        </GoogleMap>
      </div>
      {/* 선택된 마커에 대한 상세 정보 표시 */}
      {selectedMarker && (
        <div className = "box">
          <div className='h2'> - 상세 정보 -</div>
          <h3>{selectedMarker.detail.name}</h3>
          <p>
            <span className='subtitle'> 분류 : </span>
            {selectedMarker.type}
          </p>
          {/* 추가 정보 표시 */}
          {selectedMarker.type === "문화" && (
            <>
              <img className = "thumbnail" src={selectedMarker.detail.thumbnail} alt="Thumbnail" />
              <p><span className='subtitle'>장소:</span> {selectedMarker.detail.place}</p>
              <p><span className='subtitle'>기간:</span> {selectedMarker.detail.period}</p>
              <p><a href={selectedMarker.detail.url} target="_blank" rel="noopener noreferrer">자세히 보기</a></p>
            </>
          )}
          {selectedMarker.type === "주차장" && (
            <>
              <p><span className='subtitle'>주소:</span> {selectedMarker.detail.address}</p>
              <p><span className='subtitle'>가격:</span> {selectedMarker.detail.rates}</p>
              <p><span className='subtitle'>유료:</span> {selectedMarker.detail.pay}</p>
            </>
          )}
          {selectedMarker.type === "지하철" && (
            <>
              <p><span className='subtitle'>노선:</span> {selectedMarker.detail.line}</p>
              <p><span className='subtitle'>주소:</span> {selectedMarker.detail.address}</p>
              <p><span className='subtitle'>지번:</span> {selectedMarker.detail.jibun}</p>
            </>
          )}
          {selectedMarker.type === "자전거" && (
            <>
              <p><span className='subtitle'>공유량:</span> {selectedMarker.detail.shared}</p>
              <p><span className='subtitle'>주차 가능 수:</span> {selectedMarker.detail.parkingCnt}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Map;
