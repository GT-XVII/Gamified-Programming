import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LandingPageComponents/LoginForm';
import { RegisterForm } from './LandingPageComponents/RegisterForm';
import { Navigation } from './LandingPageComponents/Navigation';
import { Hero } from './LandingPageComponents/Hero';
import { CourseCard } from './LandingPageComponents/CourseCard';

const courseData = [
  { id: 'booleans', title: 'Booleans', description: 'Some descriptive text about booleans', imageSrc: '/Boolean.png', progress: 0, totalSteps: 20 },
  { id: 'strings', title: 'Strings', description: 'Some descriptive text about Strings', imageSrc: '/Strings.png', progress: 0, totalSteps: 20 },
  { id: 'zahlen', title: 'Numbers', description: 'Some descriptive text about Numbers', imageSrc: '/Numbers.png', progress: 0, totalSteps: 20 },
  { id: 'listen', title: 'Lists', description: 'Some descriptive text about Lists', imageSrc: '/Array.png', progress: 0, totalSteps: 20 }
];

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => setIsLoginOpen(true);
  const handleRegister = () => setIsRegisterOpen(true);
  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/content/${courseId}`);
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modal-overlay')) {
        closeModals();
      }
    });
    return () => document.removeEventListener('mousedown', closeModals);
  }, []);

  return (
    <main className="w-full">
      <Navigation onLogin={handleLogin} onRegister={handleRegister} isLoggedIn={isLoggedIn} />
      <Hero />
      <section className="mt-24 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          {courseData.map((course) => (
            <div 
              key={course.id} 
              className="w-full p-4 rounded-lg" 
              onClick={() => handleCourseClick(course.id)}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </section>
      {isLoginOpen && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button onClick={closeModals} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            <LoginForm onLoginSuccess={() => { setIsLoggedIn(true); setIsLoginOpen(false); }} />
          </div>
        </div>
      )}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button onClick={closeModals} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            <RegisterForm onRegisterSuccess={() => { setIsLoggedIn(true); setIsRegisterOpen(false); }} />
          </div>
        </div>
      )}
    </main>
  );
};

export default LandingPage;