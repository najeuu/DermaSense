// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Scan from './pages/Scan.jsx';
import Article from './pages/Article.jsx';
import DetailArticle from './pages/ArticleDetail.jsx';
import Profile from './pages/Profile.jsx';
import History from './pages/History.jsx';

// Komponen ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // atau cek dari cookies
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article"
          element={
            <ProtectedRoute>
              <Article />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:id"
          element={
            <ProtectedRoute>
              <DetailArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
