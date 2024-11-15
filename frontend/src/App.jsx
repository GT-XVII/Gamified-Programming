import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './output.css';
import Landing from './pages/LandingPage.tsx';
import QuizPage from '../quizpages/QuizPage';





function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz/:topic" element={<QuizPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;