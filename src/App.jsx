import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Scan from "./pages/Scan.jsx";
import Article from "./pages/Article.jsx";
import DetailArticle from "./pages/ArticleDetail.jsx";
import Profile from "./pages/Profile.jsx";
import History from "./pages/History.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public (semua bisa diakses) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<DetailArticle />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;