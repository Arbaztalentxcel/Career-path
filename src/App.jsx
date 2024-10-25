import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Career from "./pages/career";
import Modal from "./Components/Modal";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </div>
  );
};

export default App;
