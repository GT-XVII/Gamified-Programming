import React, { useEffect, useState } from 'react';
import QuizTask from './quizcomponents/QuizTask';

const QuizPage: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/quiz', { method: 'POST' })
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error('Error loading quiz:', error));
  }, []);

  return (
    <div>
      <h1>Quiz Page</h1>
      {tasks.map((task, index) => (
        <QuizTask key={index} task={task} />
      ))}
    </div>
  );
};

export default QuizPage;
