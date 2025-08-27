import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Scan from './pages/Scan';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman utama sebelum login */}
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Jika path tidak cocok, redirect ke home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
