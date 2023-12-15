import React, { useEffect } from 'react';
import GamePage from './pages/GamePage';
import HighScorePage from './pages/HighScorePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './features/categories/categoriesSlice';

function App() {
  // activate initial fetch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
