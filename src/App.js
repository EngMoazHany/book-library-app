// ✅ App.js – React Router + Dynamic Background Color + Layout Wrapper (Vanilla CSS version)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './components/BookDetails';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import './App.css';

function AppWrapper() {
  const location = useLocation();

  const getPageClass = () => {
    if (location.pathname === '/') return 'home-bg';
    if (location.pathname === '/favorites') return 'favorites-bg';
    return 'default-bg';
  };

  return (
    <div className={`app-wrapper ${getPageClass()}`}>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
