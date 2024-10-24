import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './output.css';
import Home from './pages/Home';  // Importing the Home component for the landing page
import About from './pages/About';  // Importing the About component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home component is the landing page */}
          <Route path="/about" element={<About />} />  {/* About page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;