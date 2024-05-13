import React, { useState } from 'react';
import "./FilterButtons.css";

const FilterButtons = ({ placeNum, setPlaceNum }) => {

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (index) => {
    setPlaceNum(index); // 선택된 버튼의 인덱스를 업데이트
  };

  return (
    <div className="filters">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "10개 이상"].map((number, index) => (
        <button
          key={index}
          className={placeNum === index ? "selected_filter_button" : "filter_button"}
          onClick={() => handleButtonClick(index)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
