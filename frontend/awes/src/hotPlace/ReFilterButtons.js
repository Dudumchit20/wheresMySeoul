import React, { useState } from 'react';
import "../recommend/FilterButtons.css";


// 주변 관광지 찾아보기 - 필터 버튼
const FilterButtons = ({ selectedFilters, setSelectedFilters }) => {


  // 버튼을 클릭할 때 실행되는 함수
  const handleButtonClick = (filter) => {
    // 이미 선택된 필터인지 확인
    const index = selectedFilters.indexOf(filter);

    if (index === -1) {
      // 선택된 필터가 아닌 경우, 선택된 필터 목록에 추가
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      // 이미 선택된 필터인 경우, 선택된 필터 목록에서 제거
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    }
  };

  return (
    <div className="filters">
      <button
        className={selectedFilters.includes("문화") ? "selected_filter_button_foreign" : "filter_button"}
        onClick={() => handleButtonClick("문화")}
      >
        🎭 문화행사
      </button>
      <button
        className={selectedFilters.includes("주차장") ? "selected_filter_button_shopping" : "filter_button"}
        onClick={() => handleButtonClick("주차장")}
      >
        🅿️ 주차장
      </button>
      <button
        className={selectedFilters.includes("지하철") ? "selected_filter_button_culture" : "filter_button"}
        onClick={() => handleButtonClick("지하철")}
      >
        🚊 지하철
      </button>
      <button
        className={selectedFilters.includes("자전거") ? "selected_filter_button_nature" : "filter_button"}
        onClick={() => handleButtonClick("자전거")}
      >
        🚲  따릉이
      </button>

    
    </div>
  );
};

export default FilterButtons;
