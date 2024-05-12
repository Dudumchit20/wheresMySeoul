import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
  useEffect(() => {
    // Leaflet 지도를 생성하고 설정합니다.
    const map = L.map('map');

    // OpenStreetMap 타일 레이어를 추가합니다.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 사용자 정의 마커 아이콘 설정
    const customIcon = L.icon({
      iconUrl: '/png/marker_icon.png', // 마커 아이콘 이미지 URL
      iconSize: [41, 41], // 마커 아이콘 크기
      iconAnchor: [12, 41], // 마커 아이콘 위치 조절
      popupAnchor: [1, -34] // 팝업 위치 조절
    });

    // Leaflet 맵의 중앙을 서울로 설정합니다.
    map.setView([37.5665, 126.9780], 13);

    // 현재 위치를 가져와서 지도에 마커로 표시합니다.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Leaflet 맵의 중앙을 현재 위치로 설정합니다.
        map.setView([latitude, longitude], 13);

        // 현재 위치에 마커 추가
        L.marker([latitude, longitude], { icon: customIcon }).addTo(map)
          .bindPopup("현재 위치")
          .openPopup();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // useEffect에서 반환된 함수는 컴포넌트가 언마운트될 때 정리(clean-up) 역할을 합니다.
    // 여기서 Leaflet 지도의 인스턴스를 파기하고 이벤트 리스너를 제거합니다.
    return () => {
      map.remove();
    };
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음으로 렌더링될 때만 실행되도록 합니다.

  return (
    <div id="map" style={{ flex:1 }}></div>
  );
};

export default Map;
