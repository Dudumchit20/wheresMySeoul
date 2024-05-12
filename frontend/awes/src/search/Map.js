import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, MarkerF, Marker} from '@react-google-maps/api';
import "./Map.css";
const containerStyle = {
  width: '100%',
  height: '100%'
};

// 서울의 초기 위치
const defaultCenter = {
  lat: 37.5665,
  lng: 126.9780
};
// 각 마커 유형에 따른 아이콘 색상 정의
const markerIcons = {
  "자연": "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  "쇼핑": "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "명소": "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  "음식": "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  "관광거리": "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  "외국인": "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "문화": "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
};
const mockData = [
  // 자연
  {
    type: "자연",
    name: "한강공원",
    contentUrl: "http://example.com/hanriverpark",
    address: "서울특별시 영등포구 여의동로 330",
    newAddress: "서울특별시 영등포구 여의도동 84-7",
    phoneNumber: "번호없음",
    website: "웹사이트없음",
    lat: 37.5280,
    lng: 126.9326
  },
  // 쇼핑
  {
    type: "쇼핑",
    name: "명동 쇼핑거리",
    contentUrl: "http://example.com/myeongdongshopping",
    address: "서울특별시 중구 명동길 16",
    newAddress: "서울특별시 중구 명동1가 33-1",
    phoneNumber: "02-1234-5678",
    website: "http://myeongdong.com",
    lat: 37.5600,
    lng: 126.9856
  },
  // 명소
  {
    type: "명소",
    name: "남산타워",
    contentUrl: "http://example.com/nseoultower",
    address: "서울특별시 용산구 남산공원길 105",
    newAddress: "서울특별시 용산구 남산동2가 산1-3",
    phoneNumber: "02-1234-5679",
    website: "http://nseoultower.com",
    lat: 37.5512,
    lng: 126.9882
  },
  // 음식
  {
    type: "음식",
    name: "광장시장",
    contentUrl: "http://example.com/gwangjangmarket",
    address: "서울특별시 종로구 창경궁로 88",
    newAddress: "서울특별시 종로구 예지동 88",
    phoneNumber: "02-1234-5680",
    website: "http://gwangjangmarket.com",
    lat: 37.5700,
    lng: 126.9995
  },
  // 관광 거리
  {
    type: "관광거리",
    name: "인사동길",
    contentUrl: "http://example.com/insadongstreet",
    address: "서울특별시 종로구 인사동길 62",
    newAddress: "서울특별시 종로구 인사동 194-2",
    phoneNumber: "번호없음",
    website: "http://insadongstreet.com",
    lat: 37.5711,
    lng: 126.9858
  },
  // 외국인
  {
    type: "외국인",
    name: "이태원 관광특구",
    contentUrl: "http://example.com/itaewontourism",
    address: "서울특별시 용산구 이태원로 170",
    newAddress: "서울특별시 용산구 이태원동 34-21",
    phoneNumber: "02-1234-5681",
    website: "http://itaewontourism.com",
    lat: 37.5345,
    lng: 126.9946
  }
  ,
    // 외국인
    {
      type: "문화",
      name: "이태원 관광특구",
      contentUrl: "http://example.com/itaewontourism",
      address: "서울특별시 용산구 이태원로 170",
      newAddress: "서울특별시 용산구 이태원동 34-21",
      phoneNumber: "02-1234-5681",
      website: "http://itaewontourism.com",
      lat: 37.5345,
      lng: 126.9846
    }
];

const Map = ({ selectedFilters }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    // 현재 위치를 설정
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude
        });
        console.log("Current Position:", latitude, longitude);  // 현재 위치 로그 출력
      }, () => {
        console.error("Geolocation is not supported or permission denied.");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    // 선택된 필터에 해당하는 목업 데이터를 마커로 설정
    const filteredMarkers = mockData.filter(item => selectedFilters.includes(item.type));
    setMarkers(filteredMarkers);
  }, [selectedFilters]);

  // 마커 클릭 시 InfoWindow를 활성화하는 함수
  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  // InfoWindow 닫기
  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height + 20) // Adjust y position based on your need
  });

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={13}
      >
        {/* 현재 위치에 마커 표시 */}
        <MarkerF position={currentPosition} title="현재 위치" />
    
        {markers.map((marker, index) => (
          <div key={index}>
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={markerIcons[marker.type] || "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"} // 기본 마커 색상
              title={marker.name}
              onClick={() => handleMarkerClick(marker)}
            />
          </div>
        ))}
        {/* 활성화된 마커에 정보창 표시 */}
        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h4>{activeMarker.name}</h4>
              <p>주소: {activeMarker.address}</p>
              <p>전화번호: {activeMarker.phoneNumber}</p>
              <p>웹사이트: {activeMarker.website}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
  );
};

export default Map;
//   // 선택된 필터에 따라 API 호출 및 마커 설정
//   useEffect(() => {
//     if (selectedFilters.length === 0) {
//       setMarkers([]); // 필터가 선택되지 않으면 마커 초기화
//       return;
//     }

//     const fetchMarkers = async () => {
//       const allMarkers = [];
//       for (const filter of selectedFilters) {
//         console.log(filter)
//         const response = await fetch(`http://54.172.167.243:8080/searchOneCategory?address=중구&category=${filter}`);
//         const data = await response.json();
//         console.log(data)
//         const newMarkers = data.map(item => ({
//           lat: item.latitude,
//           lng: item.longitude,
//           name: item.name
//         }));
//         allMarkers.push(...newMarkers);
//       }
//       setMarkers(allMarkers);
//     };

//     fetchMarkers();
//   }, [selectedFilters]);

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCoBqm6ZJlc2QRPAEZ8Op36nAklnfj5DsE">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={currentPosition}
//         zoom={13}
//       >
//         {/* 현재 위치 마커 */}
//         <Marker position={currentPosition} title="현재 위치" />

//         {/* 응답 데이터 마커 */}
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             title={marker.name}
//           />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;
