import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizTask from './quizcomponents/QuizTask';
import './QuizPage.css';

type Task = {
  description: string;
  difficulty: string;
  quiz: any;
};

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/load_data/${topic}.json`)
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error('Error loading quiz:', error));
  }, [topic]);

  return (
    <div>
      <h1>Quiz on {topic}</h1>
      {tasks.length > 0 ? (
        tasks.map((task, index) => <QuizTask key={index} task={task} />)
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
};

export default QuizPage;
