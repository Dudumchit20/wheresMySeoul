import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
  useEffect(() => {
    // Leaflet 지도를 생성하고 설정합니다.
    const map = L.map('map').setView([51.505, -0.09], 13);

    // OpenStreetMap 타일 레이어를 추가합니다.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // useEffect에서 반환된 함수는 컴포넌트가 언마운트될 때 정리(clean-up) 역할을 합니다.
    // 여기서 Leaflet 지도의 인스턴스를 파기하고 이벤트 리스너를 제거합니다.
    return () => {
      map.remove();
    };
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음으로 렌더링될 때만 실행되도록 합니다.

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default Map;
