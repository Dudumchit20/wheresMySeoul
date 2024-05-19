import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
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

// Translation dictionary to map filters to DB fields
const filterTrans = {
    "tourStreetKor" : "관광거리",
    "attractions": "명소",
    "entertainment": "문화",
    "shoppings": "쇼핑",
    "nature": "자연",
    "restaurants": "음식",
    "tourInformations": "외국인" 
};

const Map = ({ allData, gu, currentLat, currentLng }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
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
    console.log("지도 확인용 ----------", allData);
  }, [allData]);

  useEffect(() => {
    console.log(currentLat, currentLng);
    if (isFinite(currentLat) && isFinite(currentLng)) {
      setCurrentPosition({
        lat: currentLat,
        lng: currentLng
      });
    }
  }, [currentLat, currentLng]);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  return (
    <GoogleMap
      className="map"
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={13}
    >
      <Marker position={currentPosition} title="현재 위치" />

      {Object.keys(allData).map((originalKey, index) => {
        const translatedKey = filterTrans[originalKey];
        if (translatedKey && allData[originalKey] && allData[originalKey].length > 0) {
          return allData[originalKey].map((marker, markerIndex) => (
            <Marker
              key={`${translatedKey}-${markerIndex}`}
              position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
              icon={markerIcons[translatedKey] || "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
              title={marker.name}
              onClick={() => handleMarkerClick(marker)}
            />
          ));
        }
        return null;
      })}

      {activeMarker && (
        <InfoWindow
          position={{ lat: parseFloat(activeMarker.latitude), lng: parseFloat(activeMarker.longitude) }}
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
