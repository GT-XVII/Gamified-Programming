import React from 'react';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { CourseCard } from './CourseCard';

const courseData = [
  {
    title: 'Booleans',
    description: 'Some descriptive text about booleans',
    imageSrc: '/Boolean.png',
    progress: 0,
    totalSteps: 20
  },
  {
    title: 'Strings',
    description: 'Some descriptive text about Strings',
    imageSrc: '/Strings.png',
    progress: 0,
    totalSteps: 20
  },
  {
    title: 'Numbers',
    description: 'Some descriptive text about Numbers',
    imageSrc: '/Numbers.png',
    progress: 0,
    totalSteps: 20
  },
  {
    title: 'Lists',
    description: 'Some descriptive text about Lists',
    imageSrc: '/Array.png',
    progress: 0,
    totalSteps: 20
  }
];

const LandingPage: React.FC = () => {
  return (
    <main className="w-full">
      <Navigation onLogin={() => {}} onRegister={() => {}} />
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
    </main>
  );
};

export default LandingPage;