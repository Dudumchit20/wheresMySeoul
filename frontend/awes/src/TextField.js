import React, { useState, useEffect } from 'react';
import { setKey, fromLatLng, fromAddress } from 'react-geocode';
import WeatherComponent from './weather/weather';
import './TextField.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCoBqm6ZJlc2QRPAEZ8Op36nAklnfj5DsE'; // Replace with your actual key
const SEOUL_OPEN_DATA_AUTH_KEY = "515653596b79756a38384a77506645"; // 서울 열린 데이터

setKey(GOOGLE_MAPS_API_KEY);

const touristSpots = [
  { name: "강남 MICE 관광특구", latitude: 37.5139, longitude: 127.0581 },
  { name: "동대문 관광특구", latitude: 37.5711, longitude: 127.0094 },
  { name: "명동 관광특구", latitude: 37.5637, longitude: 126.9857 },
  { name: "이태원 관광특구", latitude: 37.5345, longitude: 126.9937 },
  // 추가적인 관광특구들...
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구 반경 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리 (km)
}

function findClosestTouristSpot(latitude, longitude) {
  let closestSpot = touristSpots[0];
  let minDistance = calculateDistance(latitude, longitude, closestSpot.latitude, closestSpot.longitude);

  for (const spot of touristSpots) {
    const distance = calculateDistance(latitude, longitude, spot.latitude, spot.longitude);
    if (distance < minDistance) {
      closestSpot = spot;
      minDistance = distance;
    }
  }

  return closestSpot;
}

function LocationSearchField({setWeatherData}) {
  const inputStyle = {
    color: 'black',
    border: '0px solid gray',
    borderRadius: '5px',
    width: '100%',
    height: '40px',
    margin: '0px 10px',
    outline: 'none',
  };

  const textFieldStyle = {
    flex: 1,
    fontSize: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const [inputValue, setInputValue] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [closestTouristSpot, setClosestTouristSpot] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fromLatLng(latitude, longitude)
            .then(({ results }) => {
              if (results && results.length > 0) {
                const address = results[0].formatted_address;
                setCurrentLocation(address);
                setInputValue(address);
              } else {
                setInputValue('Unable to find address.');
              }
              const closestSpot = findClosestTouristSpot(latitude, longitude);
              setClosestTouristSpot(closestSpot.name);
              fetchWeatherData(closestSpot.name);
            })
            .catch((error) => {
              console.error('Geocoding error:', error);
              setInputValue('Geocoding error.');
            });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setInputValue('Location access denied.');
        }
      );
    } else {
      setInputValue('Geolocation not supported.');
    }
  }, []);

  const fetchWeatherData = async (spotName) => {
    try {
      // console.log("log---[관광특구 확인]", spotName);
      const response = await fetch(`http://openapi.seoul.go.kr:8088/${SEOUL_OPEN_DATA_AUTH_KEY}/json/citydata/131/168/${spotName}`);
      const data = await response.json();
      // console.log("log---[관광특구 날씨 받기 확인]", data);
  
      // 데이터 구조에 맞게 날씨 상태 추출
      const weatherStats = data.CITYDATA.WEATHER_STTS[0];

      // PRECIPITATION : 강수량
      const precipitation = weatherStats.PRECIPITATION
      // TEMP : 기온
      const temperature = weatherStats.TEMP;
      // HUMIDITY : 습도
      const humidity = weatherStats.HUMIDITY;
      // WIND_SPD : 풍속
      const windSpeed = weatherStats.WIND_SPD;
      // PCP_MSG : 강수 메세지 (비가 올 확률을 강수 메세지로 대체, 명확한 확률 정보가 없는 경우)
      const mes_rain = weatherStats.PCP_MSG;
      // UV_MSG : 자외선 메세지
      const mes_uv = weatherStats.UV_MSG;
      // AIR_MSG : 대기 메세지
      const mes_air = weatherStats.AIR_MSG;


      // 날씨 데이터 설정
      setWeatherData({
        temperature: temperature,
        precipitation: precipitation,
        humidity: humidity,
        windSpeed: windSpeed,
        mes_rain: mes_rain,
        mes_uv: mes_uv,
        mes_air: mes_air,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  

  const handleSearch = () => {
    fromAddress(inputValue)
      .then(({ results }) => {
        if (results && results.length > 0) {
          setSearchResults(results);
          const { location } = results[0].geometry;
          const closestSpot = findClosestTouristSpot(location.lat, location.lng);
          setClosestTouristSpot(closestSpot.name);
          fetchWeatherData(closestSpot.name);
        } else {
          setSearchResults([{ formatted_address: '주소를 찾지 못했습니다.' }]);
        }
      })
      .catch((error) => {
        console.error('Geocoding error:', error);
        setSearchResults([{ formatted_address: '주소를 찾지 못했습니다.' }]);
      });
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue('');
    setCurrentLocation('');
    setSearchResults([]);
  };

  const handleSuggestionClick = (address) => {
    setInputValue(address);
    setSearchResults([]);
  };

  return (
    <div>
    <div className="weather_container">
    <div className="container_row_left">
      <h2>현재 위치</h2> 
      <h5>현재 위치 혹은 원하는 위치를 기반으로 서비스를 제공합니다.</h5>
    </div>
      <div className='textfield_container'>
      <div className="location_button">
        <button className="button_none">
          <img src="/png/search.png" alt="search" />
        </button>
        <div style={textFieldStyle}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            style={inputStyle}
            placeholder="현재 위치 혹은 원하는 위치를 검색해보세요"
          />
          <button className="button_none" onClick={handleClear}>
            <img src="/png/close.png" alt="close" />
          </button>
        </div>
      </div>
     
      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <div className="results_dropdown">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="result_row"
              onClick={
                result.formatted_address !== '주소를 찾지 못했습니다.' ? () => handleSuggestionClick(result.formatted_address) : null
              }
            >
              {result.formatted_address}
            </div>
          ))}
        </div>
      )}

 

    </div>
    </div>
         {/* 가장 가까운 관광특구 표시 */}
         {closestTouristSpot && (
          <div className="closest_spot_info">
            <strong>가장 가까운 관광특구 - </strong>  {closestTouristSpot}
          </div>
        )}
    </div>


    
  );
}

export default LocationSearchField;
