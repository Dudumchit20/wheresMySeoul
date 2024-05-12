import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';

import Home from './Home';
import HotPlaceDetail from './hotPlace/HotPlaceDetail';

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCoBqm6ZJlc2QRPAEZ8Op36nAklnfj5DsE">

    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotplaces/:placeName/:index" element={<HotPlaceDetail />} />
      </Routes>

    </Router>
    </LoadScript>

  );
}

export default App;