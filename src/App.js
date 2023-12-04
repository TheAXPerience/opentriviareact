import React from 'react';
import GamePage from './pages/GamePage';
import HighScorePage from './pages/HighScorePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<GamePage />} />
        <Route path='scores' element={<HighScorePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
