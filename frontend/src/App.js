import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';

import './App.css'

import Home from './Home';
import HotPlaceDetail from './hotPlace/HotPlaceDetail';
import RecommendDetail from './recommend/RecommendDetail'
function App() {
  return (
    <div style={{ fontFamily: 'NanumBarunGothic' }}>
    <LoadScript googleMapsApiKey="AIzaSyCoBqm6ZJlc2QRPAEZ8Op36nAklnfj5DsE">

    <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotplaces/:placeName/:index" element={<HotPlaceDetail />} />
          <Route path="/recommend/:gu/:lat/:lng/:placeNum/:filters" element={< RecommendDetail/>} />
        </Routes>

      </Router>
    </LoadScript>
    </div>
  );
}

export default App;