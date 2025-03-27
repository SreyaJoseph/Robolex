import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlphabetGrid from "./GridMap";  // The grid page
import AlphabetImageMapping from "./AlphabetImageMapping";  // The display page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GridMap/>} />
        <Route path="/letter/:letter" element={<AlphabetImageMapping />} />
      </Routes>
    </Router>
  );
}

export default App;
