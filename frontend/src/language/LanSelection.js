import React, { useState } from 'react';
import "../recommend/FilterButtons.css";
import "../App.css";
import "../Home.css"
import { useTranslation } from 'react-i18next';
import i18n from "../locales/i18n.ts";

const FilterButtons = () => {
  // 현재 선택된 버튼의 인덱스를 추적하는 상태 변수
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index); // 선택된 버튼의 인덱스를 업데이트
    
    // 언어 코드 설정
    let language = '';
    if (index === 0) {
      language = 'ko'; // 한국어
    } else if (index === 1) {
      language = 'en'; // 영어
    } else if (index === 2) {
      language = 'ch'; // 중국어
    }
  
    i18n.changeLanguage(language);  // 언어 변경 함수 호출
  };
  
  return (
    <div style={{ fontFamily: 'NanumBarunGothic' }}>

    <div className="filters">
      {["한국어", "English", "中國語"].map((number, index) => (
        <button
          key={index}
          className={selectedButtonIndex === index ? "selected_filter_button" : "filter_button"}
          onClick={() => handleButtonClick(index)}
        >
          <div className='font'>{number}</div>
        </button>
      ))}
    </div>
    </div>
  );
};

export default FilterButtons;
