import React, { useState, useEffect } from 'react';
import { setKey, fromLatLng, fromAddress } from 'react-geocode';
import WeatherComponent from './weather/weather';
import './TextField.css';


setKey(GOOGLE_MAPS_API_KEY);
function LocationSearchField() {
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
  const [searchResults, setSearchResults] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

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

  const fetchWeatherData = async (address) => {
    try {
      const response = await fetch(`http://openapi.seoul.go.kr:8088/${SEOUL_OPEN_DATA_AUTH_KEY}/json/citydata/1/5/청계산`);
      const data = await response.json();
      // 여기서 실제 API 응답에 맞게 데이터를 추출해야 합니다.
      // data의 구조를 확인하고 필요한 데이터를 추출하세요.
      console.log('Weather data:', data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    fromAddress(inputValue)
      .then(({ results }) => {
        if (results && results.length > 0) {
          setSearchResults(results);
          const { formatted_address } = results[0];
          fetchWeatherData(formatted_address);
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
    fetchWeatherData(address);
  };

  return (
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
      {weatherData && (
        <WeatherComponent
          // 여기에 날씨 데이터의 필요한 속성을 전달하세요.
        />
      )}
    </div>
  );
}

export default LocationSearchField;