import React, { useState } from 'react';
import "./App.css";
function TextField() {
  const inputStyle = {
    color: "black",
    border: "0px solid gray",
    borderRadius: "5px",
    width: "100%", // 너비를 100%로 설정하여 부모 요소의 너비를 꽉 채우도록 함
    height: "40px",
    margin: "0px 10px",
    outline: "none" // 텍스트 필드를 터치했을 때 생기는 기본 테두리를 없애는 스타일

  };
  const textFieldStyle = {
    flex: 1,
    fontSize: "20px", // 올바른 키 이름인 fontSize로 수정
    display: "flex",
    flexDirection: "row",
    alignItems: "center" /* 세로 중앙 정렬 */
  };
  const [inputValue, setInputValue] = useState('');

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
                placeholder="원하는 위치를 입력하세요"
            />
            <button className="button_none" onClick={handleClear}>
                <img src="/png/close.png" alt="close" /> 
            </button>
            </div>
    
  );
}

export default TextField;
