import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ContentPage from "./pages/ContentPage";
import NotFound from "./pages/NotFound"; 
import "./App.css";
import "./output.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz/:topic" element={<QuizPage />} />
      <Route path="/content/:courseId" element={<ContentPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
