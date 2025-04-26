import * as React from 'react';
import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LandingPageComponents/LoginForm';
import { RegisterForm } from './LandingPageComponents/RegisterForm';
import { Navigation } from './LandingPageComponents/Navigation';
import { Hero } from './LandingPageComponents/Hero';
import { CourseCard } from './LandingPageComponents/CourseCard';

interface Course {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  progress: number;
  totalSteps: number;
}

const courses: Course[] = [
  { id: 'booleans', title: 'Booleans', description: 'Some descriptive text about booleans', imageSrc: '/Boolean.png', progress: 0, totalSteps: 20 },
  { id: 'strings', title: 'Strings', description: 'Some descriptive text about Strings', imageSrc: '/Strings.png', progress: 0, totalSteps: 20 }, // Fixed typo
  { id: 'zahlen', title: 'Numbers', description: 'Some descriptive text about Numbers', imageSrc: '/Numbers.png', progress: 0, totalSteps: 20 },
  { id: 'listen', title: 'Lists', description: 'Some descriptive text about Lists', imageSrc: '/Array.png', progress: 0, totalSteps: 20 }
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-lg w-[400px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

const landingStyles = {
  container: 'w-full',
  courseSection: 'mt-24 w-full',
  courseGrid: 'grid grid-cols-2 gap-4 w-full',
  courseCard: 'w-full p-4 rounded-lg',
} as const;

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);
  const navigate = useNavigate();

  const openLogin = () => setModalType('login');
  const openRegister = () => setModalType('register');
  const closeModal = () => setModalType(null);
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    closeModal();
  };
  const handleCourseClick = (courseId: string) => navigate(`/content/${courseId}`);

  const CourseItem = ({ course }: { course: Course }) => (
    <div
      className={landingStyles.courseCard}
      onClick={() => handleCourseClick(course.id)}
    >
      <CourseCard {...course} />
    </div>
  );

  return (
    <main className={landingStyles.container}>
      <Navigation onLogin={openLogin} onRegister={openRegister} isLoggedIn={isLoggedIn} />
      <Hero />
      <section className={landingStyles.courseSection}>
        <div className={landingStyles.courseGrid}>
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      </section>
      <Modal isOpen={modalType === 'login' && !isLoggedIn} onClose={closeModal}>
        <LoginForm onLoginSuccess={handleAuthSuccess} />
      </Modal>
      <Modal isOpen={modalType === 'register'} onClose={closeModal}>
        <RegisterForm onRegisterSuccess={handleAuthSuccess} />
      </Modal>
    </main>
  );
};

export default LandingPage;