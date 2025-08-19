import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { GamePage } from './routes/GamePage';
import { NotFoundPage } from './routes/NotFoundPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
