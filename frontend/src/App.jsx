// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ContentPage from "./pages/ContentPage";
import NotFound from "./pages/NotFound"; // Import the NotFound component
import "./App.css";
import "./output.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz/:topic" element={<QuizPage />} />
      <Route path="/content/:courseId" element={<ContentPage />} />
      {/* Use the NotFound component for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
