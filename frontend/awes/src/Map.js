import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// 서울의 초기 위치
const defaultCenter = {
  lat: 37.5665,
  lng: 126.9780
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    // 브라우저의 Geolocation API를 사용하여 현재 위치를 가져옵니다.
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude
        });
      }, () => {
        console.error("Geolocation is not supported or permission denied.");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCoBqm6ZJlc2QRPAEZ8Op36nAklnfj5DsE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={13}
      >
        {/* 현재 위치에 마커 표시 */}
        <Marker position={currentPosition} title="현재 위치" />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
