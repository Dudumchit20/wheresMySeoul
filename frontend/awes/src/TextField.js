import React, { useState, useEffect } from 'react';
import "./App.css";

function TextField() {
  const inputStyle = {
    color: "black",
    border: "0px solid gray",
    borderRadius: "5px",
    width: "100%",
    height: "40px",
    margin: "0px 10px",
    outline: "none"
  };

  const textFieldStyle = {
    flex: 1,
    fontSize: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  };

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${longitude},${latitude}`;
        const sourcecrs = 'epsg:4326';
        const orders = 'addr';  // 예: 주소 변환만 필요한 경우 'addr' 사용
        const output = 'json';
        const url = `/map-reversegeocode/v2/gc?coords=${coords}&sourcecrs=${sourcecrs}&orders=${orders}&output=${output}`;

        // API 요청
        fetch(url, {
          method: 'GET',
          headers: {
            "X-NCP-APIGW-API-KEY-ID": "dkm9ev299n",  // 실제 Client ID로 대체
            "X-NCP-APIGW-API-KEY": "z4DMSTZAXQklZ01rDJmciuAhEiXTRmnEypVCDi3L"  // 실제 Client Secret으로 대체
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            // 주소 결과를 입력 값으로 설정
            setInputValue(data.results[0].region.area1.name + " " + 
                          data.results[0].region.area2.name + " " + 
                          data.results[0].region.area3.name);
          } else {
            setInputValue("주소를 찾을 수 없습니다.");
          }
        })
        .catch(error => {
          console.error('Error during geocoding:', error);
          setInputValue("Geocoding error.");
        });
      }, (error) => {
        console.error('Geolocation error:', error);
        setInputValue("Location access denied.");
      });
    } else {
      setInputValue("Geolocation not supported.");
    }
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div style={textFieldStyle}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Enter a location"
      />
      <button className="button_none" onClick={handleClear}>
        <img src="/png/close.png" alt="close" />
      </button>
    </div>
  );
}

export default TextField;
