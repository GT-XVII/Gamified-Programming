import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './output.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';  
import Landing from './pages/LandingPage.tsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home component is the landing page */}
          <Route path="/about" element={<About />} />  {/* About page route */}
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;