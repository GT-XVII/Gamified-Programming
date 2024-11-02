// landing.tsx
import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CourseCard } from './components/CourseCard';

const courseData = [
  { title: 'Booleans', description: 'Some descriptive text about booleans', imageSrc: '/Boolean.png', progress: 0, totalSteps: 20 },
  { title: 'Strings', description: 'Some descriptive text about Strings', imageSrc: '/Strings.png', progress: 0, totalSteps: 20 },
  { title: 'Numbers', description: 'Some descriptive text about Numbers', imageSrc: '/Numbers.png', progress: 0, totalSteps: 20 },
  { title: 'Lists', description: 'Some descriptive text about Lists', imageSrc: '/Array.png', progress: 0, totalSteps: 20 }
];

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogin = () => setIsLoginOpen(true);
  const handleRegister = () => setIsRegisterOpen(true);

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  // Close modal on outside click
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      closeModals();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <main className="w-full">
      <Navigation onLogin={handleLogin} onRegister={handleRegister} isLoggedIn={isLoggedIn} />
      <Hero />
      <section className="mt-24 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          {courseData.map((course, index) => (
            <div key={index} className="w-full p-4 rounded-lg">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </section>

      {/* Login Modal */}
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

      {/* Register Modal */}
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