import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { GamePage } from './routes/GamePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
