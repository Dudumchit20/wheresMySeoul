import React, { useState, useEffect } from 'react';
import "./Home.css";

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
        const orders = 'addr';
        const output = 'json';
        const url = `/map-reversegeocode/v2/gc?coords=${coords}&sourcecrs=${sourcecrs}&orders=${orders}&output=${output}`;
        
        fetch(url, {
          method: 'GET',
          headers: {
            "X-NCP-APIGW-API-KEY-ID": "dkm9ev299n",
            "X-NCP-APIGW-API-KEY": "z4DMSTZAXQklZ01rDJmciuAhEiXTRmnEypVCDi3L"
          }
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          // 여기에 응답 데이터를 처리하는 로직을 추가합니다.
        })
        .catch(error => {
          console.log('Error during geocoding:', error);
          setInputValue("Geocoding error.");
        });
      }, (error) => {
        console.log('Geolocation error:', error);
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
