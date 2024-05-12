import React, { useState, useEffect } from 'react';
import { setKey, fromLatLng, fromAddress } from 'react-geocode';
import WeatherComponent from './weather/weather';
import './TextField.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCoBqm6ZJlc2QRPAEZ8Op36nAklnfj5DsE'; // Replace with your actual key
const SEOUL_OPEN_DATA_AUTH_KEY = "515653596b79756a38384a77506645"; // 서울 열린 데이터

setKey(GOOGLE_MAPS_API_KEY);

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
  { name: "북서울꿈의숲", latitude: 37.6214313, longitude: 127.0406246 },
  { name: "불광천", latitude: 126.9157093, longitude: 126.9157093 },
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
