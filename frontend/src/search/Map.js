import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, MarkerF } from '@react-google-maps/api';
import "./Map.css";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 37.5665,
  lng: 126.9780
};

const markerIcons = {
  "자연": "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  "쇼핑": "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "명소": "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  "음식": "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  "관광거리": "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  "외국인": "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "문화": "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
};

const Map = ({ selectedFilters ,gu, currentLat, currentLng}) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [allMarkers, setAllMarkers] = useState({});
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
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
  useEffect(() => {
    console.log(currentLat, currentLng);
    setCurrentPosition({
      lat: currentLat,
      lng: currentLng
    });
  }, [currentLat, currentLng]);

    // API에서 데이터 가져올 때 각 마커에 해당하는 카테고리를 추가하도록 수정
  const fetchData = async (category) => {
    try {
      const response = await fetch(`/awes-api/searchOneCategory?address=${gu}&category=${category}`);

      // const response = await fetch(`http://3.39.223.21:8080/searchOneCategory?address=${gu}&category=${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const markersWithCategory = data.map(marker => ({ ...marker, category: category }));
      return { [category]: markersWithCategory };
    } catch (error) {
      console.error(`Failed to fetch data for category ${category}:`, error);
      return { [category]: [] };
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const filtersNames = ['관광거리', '명소', '문화', '쇼핑', '자연', '음식', '외국인'];
      const promises = filtersNames.map(category => fetchData(category));
      const results = await Promise.all(promises);
      const allData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setAllMarkers(allData);
      console.log(allData)
    };

    fetchAllData();
  }, [gu]);

  useEffect(() => {
    const filteredData = Object.keys(allMarkers)
      .filter(key => selectedFilters.includes(key))
      .flatMap(key => allMarkers[key]);
    setFilteredMarkers(filteredData);
  }, [selectedFilters, allMarkers]);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={13}
    >
      <MarkerF position={currentPosition} title="현재 위치" />

      // 필터된 데이터를 기반으로 마커 생성
      {Object.keys(allMarkers)
        .filter(key => selectedFilters.includes(key))
        .flatMap(key => allMarkers[key])
        .map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
            icon={markerIcons[marker.category] || "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
            title={marker.name}
            onClick={() => handleMarkerClick(marker)}
          />
      ))}
      {activeMarker && (
        <InfoWindow
          position={{ lat: parseFloat(activeMarker.lat), lng: parseFloat(activeMarker.lng) }}
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