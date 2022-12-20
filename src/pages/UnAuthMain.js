import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const UnAuthMain = ({setToken}) => {
  return (
    <div className="unAuthMain">
      <Router>
        <Routes>
          <Route path="/" element={<LogIn setToken={setToken} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default UnAuthMain;
