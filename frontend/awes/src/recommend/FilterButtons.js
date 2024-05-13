import React, { useState } from 'react';
import "./FilterButtons.css";

const FilterButtons = () => {
  // 각 버튼의 선택 상태를 추적하는 useState 훅
  const [selectedFilters, setSelectedFilters] = useState([]);

  
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
        className={selectedFilters.includes("관광거리") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("관광거리")}
      >
        🥳 관광거리
      </button>
      <button
        className={selectedFilters.includes("명소") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("명소")}
      >
        🗽 명소
      </button>
      <button
        className={selectedFilters.includes("문화") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("문화")}
      >
        🇰🇷 문화
      </button>
      <button
        className={selectedFilters.includes("쇼핑") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("쇼핑")}
      >
        🛍️ 쇼핑
      </button>
      <button
        className={selectedFilters.includes("자연") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("자연")}
      >
        🍀 자연
      </button>
      <button
        className={selectedFilters.includes("음식") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("음식")}
      >
        🍱 음식
      </button>
      <button
        className={selectedFilters.includes("외국인") ? "selected_filter_button" : "filter_button"}
        onClick={() => handleButtonClick("외국인")}
      >
        외국인
      </button>
    </div>
  );
};

export default FilterButtons;
